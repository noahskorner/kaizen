import { Category } from './category';
import { CategoryRecord } from './category-record';

export class CategoryAdapter {
  public static toCategory(categoryRecords: CategoryRecord[]): Category[] {
    const rootCategoryRecords = categoryRecords.filter(
      (category) => category.parentId == null
    );
    if (rootCategoryRecords.length === 0) return [];

    return rootCategoryRecords.map((categoryRecord) => {
      const rootCategory: Category = {
        id: categoryRecord.id,
        userId: categoryRecord.userId,
        parentId: categoryRecord.parentId,
        name: categoryRecord.name,
        subcategories: []
      };

      return CategoryAdapter.toCategoryRecursive(rootCategory, categoryRecords);
    });
  }

  private static toCategoryRecursive(
    category: Category,
    categories: CategoryRecord[]
  ): Category {
    const subcategories = categories.filter(
      (category) => category.parentId === category.id
    );
    if (subcategories.length === 0) return category;

    category.subcategories = subcategories.map((subcategoryRecord) => {
      const subcategory: Category = {
        id: subcategoryRecord.id,
        userId: subcategoryRecord.userId,
        parentId: subcategoryRecord.parentId,
        name: subcategoryRecord.name,
        subcategories: []
      };
      return CategoryAdapter.toCategoryRecursive(subcategory, categories);
    });
    return category;
  }
}
