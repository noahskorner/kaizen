import { useDispatch, useSelector } from 'react-redux';
import {
  Category,
  TransactionCategory,
  UpdateTransactionCategoryRequest
} from '@kaizen/finance';
import { CreateCategoryDialog } from './create-category-dialog';
import { Button, Separator, useToast } from '@kaizen/core-client';
import { UpdateTransactionCategoryClient } from '../transaction/update-transaction-category.client';
import { TransactionDispatch } from '../transaction/transaction.store';
import { setTransactionAction } from '../transaction';
import { selectCategories } from './category.selectors';
import { MouseEvent, useMemo, useState } from 'react';

export interface CategorySelectProps {
  transactionId: string;
  selectedCategory: TransactionCategory | null;
}

export const CategorySelect = ({
  transactionId,
  selectedCategory
}: CategorySelectProps) => {
  const [disabled, setDisabled] = useState(false);
  const categories = useSelector(selectCategories);
  const { toast } = useToast();
  const dispatch = useDispatch<TransactionDispatch>();

  const onCategoryClick = async (
    event: MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    event.preventDefault();

    setDisabled(true);

    try {
      const response = await UpdateTransactionCategoryClient.update({
        transactionId: transactionId,
        categoryId: categoryId
      } satisfies UpdateTransactionCategoryRequest);

      if (response.type === 'FAILURE') {
        toast({
          title: 'Uh oh!',
          description:
            'Something went wrong. Unable to update transaction category.'
        });
        return;
      }

      dispatch(setTransactionAction(response.data));
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="flex  flex-col gap-2">
      <CategoryItem
        disabled={disabled}
        parentId={null}
        categories={categories}
        selectedCategory={selectedCategory}
        unselectedLevels={0}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
};

interface CategoryItemProps {
  disabled: boolean;
  categories: Category[];
  selectedCategory: TransactionCategory | null;
  parentId: string | null;
  unselectedLevels: number;
  onCategoryClick: (
    event: MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => void;
}

const CategoryItem = ({
  disabled,
  parentId,
  categories,
  selectedCategory,
  unselectedLevels: initialUnselectedLevels,
  onCategoryClick
}: CategoryItemProps) => {
  const next = useMemo(() => {
    return (
      categories.find((category) => category.id === selectedCategory?.id) ??
      categories.at(0)
    );
  }, [categories, selectedCategory?.id]);
  const unselectedLevels =
    initialUnselectedLevels + (selectedCategory == null ? 1 : 0);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            return (
              <Button
                key={category.id}
                disabled={disabled}
                onClick={(event) => onCategoryClick(event, category.id)}
                type="button"
                variant={
                  category.id === selectedCategory?.id ? 'primary' : 'secondary'
                }
                size="pill">
                {category.name}
              </Button>
            );
          })}
          <CreateCategoryDialog parentId={parentId} />
        </div>
      </div>
      <Separator />
      {next && unselectedLevels === 0 && (
        <CategoryItem
          disabled={disabled}
          parentId={next.id}
          categories={next.subcategories}
          selectedCategory={selectedCategory?.subcategory ?? null}
          unselectedLevels={unselectedLevels}
          onCategoryClick={onCategoryClick}
        />
      )}
    </>
  );
};
