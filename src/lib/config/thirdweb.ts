import { Connection, clusterApiUrl } from "@solana/web3.js";

// Thirdweb configuration (will be properly configured when we set up the SDK)
export const thirdwebConfig = {
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
  secretKey: process.env.THIRDWEB_SECRET_KEY,
};

// Solana network configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK as 'devnet' | 'mainnet-beta' || 'devnet';
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(SOLANA_NETWORK);

// Solana connection
export const solanaConnection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Token addresses
export const USDC_MINT_ADDRESS = process.env.NEXT_PUBLIC_USDC_MINT_ADDRESS!;

// Platform configuration
export const PLATFORM_FEE_PERCENTAGE = parseInt(process.env.PLATFORM_FEE_PERCENTAGE || '3');
export const PLATFORM_WALLET_ADDRESS = process.env.PLATFORM_WALLET_ADDRESS!;

// Contract addresses (to be populated after deployment)
export const CLUB_TREASURY_PROGRAM_ID = process.env.NEXT_PUBLIC_CLUB_TREASURY_PROGRAM_ID;
export const MEMBERSHIP_TOKEN_PROGRAM_ID = process.env.NEXT_PUBLIC_MEMBERSHIP_TOKEN_PROGRAM_ID;