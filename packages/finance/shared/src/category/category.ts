export interface Category {
  id: string;
  userId: string;
  parentId: string | null;
  name: string;
  subcategories: Category[];
}
