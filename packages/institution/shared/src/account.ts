export interface Balance {
  current: number;
  available: number;
}

export interface Account {
  id: string;
  externalId: string;
  balance: Balance;
}
