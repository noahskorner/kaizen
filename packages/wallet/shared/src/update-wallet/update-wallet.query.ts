import { UpdateWalletCommand } from './update-wallet.command';

export interface UpdateWalletQuery extends Omit<UpdateWalletCommand, 'userId'> {
  walletId: string;
}
