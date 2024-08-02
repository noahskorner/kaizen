import { useSelector } from 'react-redux';
import { selectCategoriesByParentId } from './category.selectors';
import { Category } from '@kaizen/finance';
import { CreateCategoryDialog } from './create-category-dialog';
import { Button } from '@kaizen/core-client';
import { MouseEvent } from 'react';

export interface CategorySelectProps {}

export const CategorySelect = () => {
  const rootCategories = useSelector(selectCategoriesByParentId(null));

  const onCategoryClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-2">
        {rootCategories.map((category) => {
          return (
            <Button
              onClick={onCategoryClick}
              key={category.id}
              variant="secondary"
              size="pill">
              {category.name}
            </Button>
          );
        })}
        <CreateCategoryDialog />
      </div>
      {rootCategories[0] && (
        <CategorySelectRecursive category={rootCategories[0]} level={1} />
      )}
    </div>
  );
};

interface CategorySelectRecursiveProps {
  category: Category;
  level: number;
}

const CategorySelectRecursive = ({
  category,
  level
}: CategorySelectRecursiveProps) => {
  if (category.subcategories.length === 0) return null;
  return (
    <>
      <div className="flex gap-2">
        {category.subcategories.map((category) => {
          return (
            <button
              key={category.id}
              className={`flex items-center rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-white transition-colors`}>
              {category.name}
            </button>
          );
        })}
      </div>
      {category.subcategories[0] && (
        <CategorySelectRecursive
          category={category.subcategories[0]}
          level={++level}
        />
      )}
    </>
  );
};
