export declare enum ExternalAccountType {
  Investment = 'investment',
  Credit = 'credit',
  Depository = 'depository',
  Loan = 'loan',
  Brokerage = 'brokerage',
  Other = 'other'
}

export interface ExternalBalance {
  current: number;
  available: number;
}

export interface ExternalAccount {
  id: string;
  type: ExternalAccountType;
  balance: ExternalBalance;
}
