import { Category } from './category';
import { CategoryRecord } from './category-record';

export class CategoryAdapter {
  public static toCategory(record: CategoryRecord): Category {
    const category: Category = {
      id: record.id,
      originalCategory: record.originalCategory,
      userCategory: record.userCategory,
      detailed: record.detailed,
      confidenceLevel: record.confidenceLevel,
      iconUrl: record.iconUrl
    };

    return category;
  }
}
