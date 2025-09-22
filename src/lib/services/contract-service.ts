import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getMint
} from "@solana/spl-token";
import {
  solanaConnection,
  USDC_MINT_ADDRESS,
  PLATFORM_FEE_PERCENTAGE,
  PLATFORM_WALLET_ADDRESS
} from "../config/thirdweb";

export interface ClubContracts {
  treasuryAddress: string;
  membershipTokenMint: string;
  clubId: string;
}

export interface TransactionResult {
  signature: string;
  success: boolean;
  platformFee: number;
  netAmount: number;
  error?: string;
}

export interface MembershipResult {
  tokensReceived: number;
  ownershipPercentage: number;
  transactionSignature: string;
}

export interface ProposalData {
  title: string;
  description: string;
  proposalType: 'PRICING' | 'TREASURY_SPEND' | 'GOVERNANCE';
  amount?: number;
  newPrice?: number;
}

export class ContractService {
  private static connection = solanaConnection;

  /**
   * Deploy contracts for a new club
   * For now, this creates the treasury wallet and membership tracking
   */
  static async deployClubContracts(clubData: {
    name: string;
    description: string;
    initialPrice: number;
  }): Promise<ClubContracts> {
    try {
      // Generate a new keypair for the club treasury
      const { Keypair } = await import("@solana/web3.js");
      const treasuryKeypair = Keypair.generate();

      // For MVP, we'll use a simple approach:
      // - Treasury is just a Solana wallet address
      // - Membership tokens are tracked in our database
      // - Later we'll upgrade to proper SPL token program

      const clubId = `club_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        treasuryAddress: treasuryKeypair.publicKey.toString(),
        membershipTokenMint: `membership_${clubId}`, // Placeholder for now
        clubId
      };
    } catch (error) {
      console.error('Error deploying club contracts:', error);
      throw new Error('Failed to deploy club contracts');
    }
  }

  /**
   * Process contribution to club treasury with platform fee
   */
  static async contributeToTreasury(
    clubTreasuryAddress: string,
    contributorWallet: string,
    amount: number, // Amount in USDC (smallest unit)
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ): Promise<TransactionResult> {
    try {
      const contributorPubkey = new PublicKey(contributorWallet);
      const treasuryPubkey = new PublicKey(clubTreasuryAddress);
      const platformPubkey = new PublicKey(PLATFORM_WALLET_ADDRESS);
      const usdcMint = new PublicKey(USDC_MINT_ADDRESS);

      // Calculate platform fee
      const platformFee = Math.floor((amount * PLATFORM_FEE_PERCENTAGE) / 100);
      const netAmount = amount - platformFee;

      // Get associated token accounts
      const contributorTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        contributorPubkey
      );

      const treasuryTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        treasuryPubkey
      );

      const platformTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        platformPubkey
      );

      const transaction = new Transaction();

      // Check if treasury token account exists, create if not
      const treasuryAccountInfo = await this.connection.getAccountInfo(treasuryTokenAccount);
      if (!treasuryAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            contributorPubkey, // payer
            treasuryTokenAccount,
            treasuryPubkey, // owner
            usdcMint
          )
        );
      }

      // Check if platform token account exists, create if not
      const platformAccountInfo = await this.connection.getAccountInfo(platformTokenAccount);
      if (!platformAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            contributorPubkey, // payer
            platformTokenAccount,
            platformPubkey, // owner
            usdcMint
          )
        );
      }

      // Transfer to club treasury (net amount)
      transaction.add(
        createTransferInstruction(
          contributorTokenAccount,
          treasuryTokenAccount,
          contributorPubkey,
          netAmount
        )
      );

      // Transfer platform fee
      if (platformFee > 0) {
        transaction.add(
          createTransferInstruction(
            contributorTokenAccount,
            platformTokenAccount,
            contributorPubkey,
            platformFee
          )
        );
      }

      // Get recent blockhash
      const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = contributorPubkey;

      // Sign transaction (this will be handled by wallet)
      const signedTransaction = await signTransaction(transaction);

      // Send transaction
      const signature = await this.connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm transaction
      await this.connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      return {
        signature,
        success: true,
        platformFee,
        netAmount,
      };

    } catch (error) {
      console.error('Error contributing to treasury:', error);
      return {
        signature: '',
        success: false,
        platformFee: 0,
        netAmount: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Calculate platform fee for a given amount
   */
  static async collectPlatformFee(amount: number): Promise<number> {
    const fee = Math.floor((amount * PLATFORM_FEE_PERCENTAGE) / 100);
    return amount - fee; // Return net amount
  }

  /**
   * Get treasury balance for a club
   */
  static async getTreasuryBalance(clubTreasuryAddress: string): Promise<number> {
    try {
      const treasuryPubkey = new PublicKey(clubTreasuryAddress);
      const usdcMint = new PublicKey(USDC_MINT_ADDRESS);

      const treasuryTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        treasuryPubkey
      );

      const accountInfo = await this.connection.getTokenAccountBalance(treasuryTokenAccount);
      return parseInt(accountInfo.value.amount);
    } catch (error) {
      console.error('Error getting treasury balance:', error);
      return 0;
    }
  }

  /**
   * Get total platform revenue
   */
  static async getPlatformRevenue(): Promise<number> {
    try {
      const platformPubkey = new PublicKey(PLATFORM_WALLET_ADDRESS);
      const usdcMint = new PublicKey(USDC_MINT_ADDRESS);

      const platformTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        platformPubkey
      );

      const accountInfo = await this.connection.getTokenAccountBalance(platformTokenAccount);
      return parseInt(accountInfo.value.amount);
    } catch (error) {
      console.error('Error getting platform revenue:', error);
      return 0;
    }
  }

  /**
   * Mint membership tokens (for now, this is tracked in database)
   */
  static async mintMembershipTokens(
    clubId: string,
    memberWallet: string,
    netAmount: number
  ): Promise<void> {
    // For MVP, we'll track membership in the database
    // Later this will be actual SPL token minting
    console.log(`Minting ${netAmount} membership tokens for ${memberWallet} in club ${clubId}`);
  }

  /**
   * Create governance proposal (placeholder for now)
   */
  static async createGovernanceProposal(
    clubId: string,
    proposal: ProposalData
  ): Promise<string> {
    // For MVP, proposals will be stored in database
    // Later this will be on-chain governance
    const proposalId = `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`Creating proposal ${proposalId} for club ${clubId}:`, proposal);
    return proposalId;
  }

  /**
   * Vote on proposal (placeholder for now)
   */
  static async voteOnProposal(
    proposalId: string,
    voterWallet: string,
    vote: boolean
  ): Promise<void> {
    // For MVP, votes will be stored in database
    // Later this will be on-chain voting
    console.log(`Voter ${voterWallet} voted ${vote ? 'YES' : 'NO'} on proposal ${proposalId}`);
  }

  /**
   * Helper: Convert USDC amount to smallest unit (6 decimals)
   */
  static usdcToSmallestUnit(amount: number): number {
    return Math.floor(amount * 1_000_000); // USDC has 6 decimals
  }

  /**
   * Helper: Convert smallest unit to USDC amount
   */
  static smallestUnitToUsdc(amount: number): number {
    return amount / 1_000_000; // USDC has 6 decimals
  }
}