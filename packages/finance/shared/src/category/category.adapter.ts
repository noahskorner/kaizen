import { Category } from './category';
import { CategoryRecord } from './category-record';

export class CategoryAdapter {
  public static toCategory(record: CategoryRecord): Category {
    const category: Category = {
      id: record.id,
      userId: record.userId,
      name: record.name
    };

    return category;
  }
}
