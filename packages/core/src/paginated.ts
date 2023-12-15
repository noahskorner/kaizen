export const DEFAULT_PAGE_SIZE = 10;

export interface Paginated<T> {
  hits: T[];
  total: number;
}
