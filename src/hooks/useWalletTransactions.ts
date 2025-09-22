import { useState, useCallback } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Connection, Transaction, PublicKey } from '@solana/web3.js';
import { ContractService, TransactionResult } from '../lib/services/contract-service';
import { solanaConnection } from '../lib/config/thirdweb';

export interface ContributionState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  result: TransactionResult | null;
}

export function useWalletTransactions() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [contributionState, setContributionState] = useState<ContributionState>({
    isLoading: false,
    error: null,
    success: false,
    result: null
  });

  // Get the user's Solana wallet
  const getSolanaWallet = useCallback(() => {
    if (!authenticated || !wallets.length) return null;

    // Look for Solana wallet
    const solanaWallet = wallets.find(wallet =>
      wallet.walletClientType === 'privy' &&
      wallet.connectorType === 'embedded'
    );

    return solanaWallet;
  }, [authenticated, wallets]);

  // Sign a Solana transaction
  const signTransaction = useCallback(async (transaction: Transaction): Promise<Transaction> => {
    const wallet = getSolanaWallet();
    if (!wallet || !wallet.address) {
      throw new Error('No Solana wallet found');
    }

    try {
      // For Privy embedded wallets, we need to use their signing method
      // This is a simplified version - actual implementation may vary
      if ('signTransaction' in wallet && typeof wallet.signTransaction === 'function') {
        return await wallet.signTransaction(transaction);
      }

      throw new Error('Wallet does not support transaction signing');
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }, [getSolanaWallet]);

  // Contribute USDC to a club treasury
  const contributeToClub = useCallback(async (
    clubTreasuryAddress: string,
    amountInUsdc: number
  ) => {
    setContributionState({
      isLoading: true,
      error: null,
      success: false,
      result: null
    });

    try {
      const wallet = getSolanaWallet();
      if (!wallet?.address) {
        throw new Error('Please connect your wallet first');
      }

      // Convert USDC amount to smallest unit (6 decimals)
      const amountInSmallestUnit = ContractService.usdcToSmallestUnit(amountInUsdc);

      // Process the contribution
      const result = await ContractService.contributeToTreasury(
        clubTreasuryAddress,
        wallet.address,
        amountInSmallestUnit,
        signTransaction
      );

      if (result.success) {
        setContributionState({
          isLoading: false,
          error: null,
          success: true,
          result
        });
      } else {
        throw new Error(result.error || 'Transaction failed');
      }

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setContributionState({
        isLoading: false,
        error: errorMessage,
        success: false,
        result: null
      });
      throw error;
    }
  }, [getSolanaWallet, signTransaction]);

  // Get wallet balance
  const getWalletBalance = useCallback(async (): Promise<number> => {
    const wallet = getSolanaWallet();
    if (!wallet?.address) return 0;

    try {
      const balance = await solanaConnection.getBalance(new PublicKey(wallet.address));
      return balance / 1_000_000_000; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return 0;
    }
  }, [getSolanaWallet]);

  // Get USDC balance
  const getUsdcBalance = useCallback(async (): Promise<number> => {
    const wallet = getSolanaWallet();
    if (!wallet?.address) return 0;

    try {
      // This would require checking the USDC token account
      // For now, return 0 - will implement proper USDC balance checking
      return 0;
    } catch (error) {
      console.error('Error getting USDC balance:', error);
      return 0;
    }
  }, [getSolanaWallet]);

  // Reset contribution state
  const resetContributionState = useCallback(() => {
    setContributionState({
      isLoading: false,
      error: null,
      success: false,
      result: null
    });
  }, []);

  return {
    // Wallet info
    ready,
    authenticated,
    walletAddress: getSolanaWallet()?.address || null,

    // Transaction functions
    contributeToClub,
    getWalletBalance,
    getUsdcBalance,

    // State
    contributionState,
    resetContributionState,

    // Utilities
    isWalletConnected: !!getSolanaWallet()?.address,
    userEmail: user?.email?.address || null
  };
}