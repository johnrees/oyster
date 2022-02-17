import { PublicKey, Transaction } from '@solana/web3.js';

export type WalletSigner = {
  publicKey: PublicKey | null;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transaction: Transaction[]): Promise<Transaction[]>;
};

export class WalletError extends Error {
  constructor(message?: string, readonly error?: any) {
    super(message);
  }
}

export class WalletNotConnectedError extends WalletError {
}

export function isWalletNotConnectedError(
  error: any,
): error is WalletNotConnectedError {
  return error instanceof WalletNotConnectedError;
}
