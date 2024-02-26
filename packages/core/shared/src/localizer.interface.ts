export interface ILocalizer {
  localize(key: string, ...args: unknown[]): string;
}
