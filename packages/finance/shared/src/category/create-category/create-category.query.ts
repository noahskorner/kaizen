export interface CreateCategoryQuery {
  userId: string;
  parentId: string | null;
  name: string;
}
