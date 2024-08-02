export interface TransactionCategory {
  id: string;
  userId: string;
  parentId: string | null;
  name: string;
  subcategory: TransactionCategory | null;
}
