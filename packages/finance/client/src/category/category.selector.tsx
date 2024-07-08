import { useClickOutside } from '@kaizen/core-client';
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

export interface CategorySelectorProps {
  transactionId: string;
  name: string;
}

export const CategorySelector = ({
  transactionId,
  name
}: CategorySelectorProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const categories = useSelector(selectCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setShowDropdown(false)
  );
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
    setShowDropdown(!showDropdown);
  };

  const onCategoryMouseEnter = () => {
    setShowDropdown(true);
  };

  const onCategoryMouseLeave = () => {
    setShowDropdown(false);
  };

  const onUpdateCategoryClick = async (categoryId: string) => {
    await createCategory(categoryId);
    setShowDropdown(false);
  };

  const onCategorySearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    const newFilteredCategories = filteredCategories;
    setFilteredCategories(newFilteredCategories);
  };

  const onCreateCategoryClick = async (name: string) => {
    const response = await CategoryClient.create({
      name: name
    } satisfies CreateCategoryRequest);

    if (response.type === 'SUCCESS') {
      dispatch(addCategoryAction(response.data));

      await createCategory(response.data.id);
    }

    setShowDropdown(false);
  };

  useEffect(() => {
    if (!showDropdown) {
      setSearchText('');
    }
  }, [showDropdown]);

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [inputRef, showDropdown]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  return (
    <div className="relative">
      <button
        onMouseEnter={onCategoryMouseEnter}
        onClick={onCategoryClick}
        className="rounded-lg bg-green-300 px-2 py-1 text-xs font-medium lowercase text-gray-700">
        {name}
      </button>
      <div
        ref={dropdownRef}
        onMouseLeave={onCategoryMouseLeave}
        tabIndex={-1}
        className={`${showDropdown ? 'flex flex-col gap-y-1' : 'hidden'} absolute left-0 top-full z-10 mt-1 w-[32rem] gap-y-4 rounded-lg bg-neutral-600 p-4 shadow-lg`}>
        <input
          value={searchText}
          onInput={onCategorySearch}
          ref={inputRef}
          type="text"
          className="block w-full rounded-lg border border-neutral-500 bg-neutral-700 p-2 text-xs text-neutral-50 outline-none focus:border-neutral-50 focus:ring-neutral-50"
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
                  className={`${category.name === name ? '' : ''} inline h-32 w-full rounded-lg bg-neutral-500 px-2 py-1 text-xs font-medium lowercase text-neutral-50 shadow-lg hover:bg-neutral-400`}>
                  {category.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
