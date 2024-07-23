export interface ExchangeRate {
  id: string;
  updatedAt: string;
  base: string;
  rates: {
    [currency: string]: number;
  };
}
