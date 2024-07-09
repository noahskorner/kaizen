import {
  Category,
  CreateCategoryRequest,
  UpdateTransactionCategoryRequest
} from '@kaizen/finance';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from './category.selectors';
import { CategoryClient } from './category.client';
import { addCategoryAction } from './category.actions';
import { CategoryDispatch } from './category.store';
import {
  TransactionClient,
  TransactionDispatch,
  setTransactionAction
} from '../transaction';
import { TextInput } from '@kaizen/core-client';

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
  const dispatch = useDispatch<CategoryDispatch & TransactionDispatch>();

  const createCategory = async (categoryId: string) => {
    const response = await TransactionClient.updateCategory({
      transactionId: transactionId,
      categoryId: categoryId
    } satisfies UpdateTransactionCategoryRequest);

    if (response.type === 'SUCCESS') {
      dispatch(setTransactionAction(response.data));
    }
  };

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

  const onCategoryMouseLeave = () => {
    onTransactionDeselected();
  };

  const onUpdateCategoryClick = async (categoryId: string) => {
    await createCategory(categoryId);
    onTransactionDeselected();
  };

  const onCategorySearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const onCreateCategoryClick = async (name: string) => {
    const response = await CategoryClient.create({
      name: name
    } satisfies CreateCategoryRequest);

    if (response.type === 'SUCCESS') {
      dispatch(addCategoryAction(response.data));

      await createCategory(response.data.id);
    }

    onTransactionDeselected();
  };

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
    <div className="relative" onMouseLeave={onCategoryMouseLeave}>
      <button
        onMouseEnter={onCategoryMouseEnter}
        onClick={onCategoryClick}
        className="rounded-lg bg-green-300 px-2 py-1 text-xs font-medium lowercase text-neutral-700">
        {name}
      </button>
      <div className="absolute left-0 top-full z-10 pt-1">
        <div
          tabIndex={-1}
          className={`${selected ? 'flex flex-col gap-y-1' : 'hidden'} w-[32rem] gap-y-4 rounded-lg bg-neutral-600 p-4 shadow-lg`}>
          <h6 className="font-semibold">Category</h6>
          <TextInput
            id="category-search"
            name="category-search"
            value={searchText}
            onChange={onCategorySearch}
          />
          <div className="grid max-h-[32rem] grid-cols-3 gap-4 overflow-auto pr-2">
            {searchText.length > 0 && (
              <div className="w-full">
                <button
                  onClick={() => onCreateCategoryClick(searchText)}
                  className="inline h-32 w-full rounded-lg bg-neutral-500 px-2 py-1 text-xs font-medium lowercase text-neutral-50">
                  {searchText} (New Category)
                </button>
              </div>
            )}
            {filteredCategories.map((category) => {
              return (
                <div key={category.id} className="col-span-1">
                  <button
                    onClick={() => onUpdateCategoryClick(category.id)}
                    className={`${category.name === name ? 'border border-neutral-400' : ''} inline h-32 w-full rounded-lg bg-neutral-500 px-2 py-1 text-xs font-medium lowercase text-neutral-50 shadow-lg hover:bg-neutral-400 `}>
                    {category.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
