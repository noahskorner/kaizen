export interface ExternalExchangeRate {
  base: string;
  rates: {
    [currency: string]: number;
  };
}
