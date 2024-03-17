import { Wallet } from './wallet';
import { WalletRecord } from './wallet-record';

export class WalletAdapter {
  public static toWallet(record: WalletRecord): Wallet {
    const wallet: Wallet = {
      id: record.id,
      userId: record.userId,
      balance: record.balance
    };
    return wallet;
  }
}
