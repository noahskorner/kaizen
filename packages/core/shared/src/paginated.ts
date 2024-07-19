export const DEFAULT_PAGE_SIZE = 25;

export interface Paginated<T> {
  hits: T[];
  total: number;
}
