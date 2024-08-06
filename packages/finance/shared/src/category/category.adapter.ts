import { Category } from './category';
import { CategoryRecord } from './category-record';

export class CategoryAdapter {
  public static toCategory(categoryRecord: CategoryRecord): Category {
    return {
      id: categoryRecord.id,
      userId: categoryRecord.userId,
      parentId: categoryRecord.parentId,
      name: categoryRecord.name,
      subcategories: []
    } satisfies Category;
  }

  public static toCategories(categoryRecords: CategoryRecord[]): Category[] {
    const rootCategoryRecords = categoryRecords.filter(
      (category) => category.parentId == null
    );
    if (rootCategoryRecords.length === 0) return [];

    return rootCategoryRecords.map((categoryRecord) => {
      return CategoryAdapter.toCategoriesRecursive(
        categoryRecord,
        categoryRecords
      );
    });
  }

  private static toCategoriesRecursive(
    categoryRecord: CategoryRecord,
    categoryRecords: CategoryRecord[]
  ): Category {
    const category = CategoryAdapter.toCategory(categoryRecord);
    const subcategoryRecords = categoryRecords.filter(
      (record) => record.parentId === categoryRecord.id
    );
    if (subcategoryRecords.length === 0) return category;

    category.subcategories = subcategoryRecords.map((subcategoryRecord) => {
      return CategoryAdapter.toCategoriesRecursive(
        subcategoryRecord,
        categoryRecords
      );
    });
    return category;
  }
}
