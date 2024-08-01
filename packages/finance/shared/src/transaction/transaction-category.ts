export interface TransactionCategory {
  id: string;
  userId: string;
  parentCategoryId: string | null;
  name: string;
  subcategory: TransactionCategory | null;
}
