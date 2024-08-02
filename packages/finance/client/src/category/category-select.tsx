import { useSelector } from 'react-redux';
import { selectCategoriesByParentId } from './category.selectors';
import { Category } from '@kaizen/finance';

export interface CategorySelectProps {}

export const CategorySelect = () => {
  const rootCategories = useSelector(selectCategoriesByParentId(null));

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs text-muted-foreground">Primary categories</span>
      <div className="flex gap-2">
        {rootCategories.map((category) => {
          return (
            <button
              key={category.id}
              className="flex items-center rounded-full bg-green-300 px-2.5 py-1 text-xs font-semibold text-zinc-950 transition-colors hover:border-green-300/80 hover:bg-green-300/80 focus:outline-none focus:ring-2 focus:ring-ring">
              {category.name}
            </button>
          );
        })}
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
      <span className="text-xs text-muted-foreground">Subcategories</span>
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
