export interface SyncExchangeRateQuery {
  base: string;
  rates: {
    [currency: string]: number;
  };
}
