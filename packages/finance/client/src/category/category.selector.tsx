import { Category } from '@kaizen/finance';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from './category.selectors';

export interface CategorySelectorProps {
  transactionId: string;
  selected: boolean;
  name: string;
  onTransactionSelected: (transactionId: string) => void;
  onTransactionDeselected: () => void;
}

export const CategorySelector = ({
  transactionId,
  selected,
  name,
  onTransactionSelected,
  onTransactionDeselected
}: CategorySelectorProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const categories = useSelector(selectCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // const dispatch = useDispatch<CategoryDispatch & TransactionDispatch>();

  // const createCategory = async (categoryId: string) => {
  //   const response = await TransactionClient.updateCategory({
  //     transactionId: transactionId,
  //     categoryId: categoryId
  //   } satisfies UpdateTransactionCategoryRequest);

  //   if (response.type === 'SUCCESS') {
  //     dispatch(setTransactionAction(response.data));
  //   }
  // };

  const onCategoryClick = () => {
    if (selected) {
      onTransactionDeselected();
    } else {
      onTransactionSelected(transactionId);
    }
  };

  const onCategoryMouseEnter = () => {
    onTransactionSelected(transactionId);
  };

  // const onCategoryMouseLeave = () => {
  //   onTransactionDeselected();
  // };

  // const onUpdateCategoryClick = async (categoryId: string) => {
  //   await createCategory(categoryId);
  //   onTransactionDeselected();
  // };

  // const onCategorySearch = (event: FormEvent<HTMLInputElement>) => {
  //   setSearchText(event.currentTarget.value);
  // };

  // const onCreateCategoryClick = async (name: string) => {
  //   const response = await CategoryClient.create({
  //     name: name
  //   } satisfies CreateCategoryRequest);

  //   if (response.type === 'SUCCESS') {
  //     dispatch(addCategoryAction(response.data));

  //     await createCategory(response.data.id);
  //   }

  //   onTransactionDeselected();
  // };

  useEffect(() => {
    if (!selected) {
      setSearchText('');
    }
  }, [selected]);

  useEffect(() => {
    if (selected) {
      inputRef.current?.focus();
    }
  }, [inputRef, selected]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (searchText.length > 0) {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchText]);

  return (
    <div className="flex gap-1">
      <button
        onMouseEnter={onCategoryMouseEnter}
        onClick={onCategoryClick}
        className="rounded-lg bg-green-300 px-2 py-1 text-xs text-zinc-900">
        {name}
      </button>
      {filteredCategories.map((category) => {
        return (
          <button
            key={category.id}
            onMouseEnter={onCategoryMouseEnter}
            onClick={onCategoryClick}
            className="rounded-lg  bg-zinc-700 px-2 py-1.5  text-xs text-zinc-50 hover:bg-zinc-700/80">
            {category.name}
          </button>
        );
      })}
    </div>
  );
};
