import { CategoryRecord } from '../category';
import { TransactionCategory } from './transaction-category';
import { TransactionCategoryRecord } from './transaction-category-record';

export class TransactionCategoryAdapter {
  public static toTransactionCategory(
    transactionCategoryRecords: TransactionCategoryRecord[]
  ): TransactionCategory | null {
    const categories = transactionCategoryRecords.map(
      (transactionCategoryRecord) => transactionCategoryRecord.category
    );
    const rootCategories = categories.filter(
      (category) => category.parentId == null
    );
    if (rootCategories.length === 0) {
      return null;
    }
    if (rootCategories.length > 1) {
      throw new Error(
        'There was more than one root category for this transaction. That should never happen.'
      );
    }

    const rootCategory: TransactionCategory = {
      id: rootCategories[0].id,
      userId: rootCategories[0].userId,
      parentCategoryId: rootCategories[0].parentId,
      name: rootCategories[0].name,
      subcategory: null
    };
    return TransactionCategoryAdapter.toTransactionCategoryRecursive(
      rootCategory,
      categories
    );
  }

  private static toTransactionCategoryRecursive(
    transactionCategory: TransactionCategory,
    categories: CategoryRecord[]
  ): TransactionCategory {
    const subcategories = categories.filter(
      (category) => category.parentId === transactionCategory.id
    );
    if (subcategories.length === 0) {
      return transactionCategory;
    }
    if (subcategories.length > 1) {
      throw new Error(
        'There was more than one subcategory for this transaction. That should never happen.'
      );
    }

    const subcategory: TransactionCategory = {
      id: subcategories[0].id,
      userId: subcategories[0].userId,
      parentCategoryId: subcategories[0].parentId,
      name: subcategories[0].name,
      subcategory: null
    };
    transactionCategory.subcategory =
      TransactionCategoryAdapter.toTransactionCategoryRecursive(
        subcategory,
        categories
      );
    return transactionCategory;
  }
}
