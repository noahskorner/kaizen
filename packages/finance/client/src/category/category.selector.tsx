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

  const onUpdateCategoryClick = async (categoryId: string) => {
    await createCategory(categoryId);
    setShowDropdown(!showDropdown);
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
        onClick={onCategoryClick}
        className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
        {name}
      </button>
      <div
        ref={dropdownRef}
        tabIndex={-1}
        className={`${showDropdown ? 'flex flex-col gap-y-1' : 'hidden'} absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border bg-white p-2 shadow-lg`}>
        <input
          value={searchText}
          onInput={onCategorySearch}
          ref={inputRef}
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="flex max-h-52 flex-col gap-y-1 overflow-auto">
          {searchText.length > 0 && (
            <div className="w-full">
              <button
                onClick={() => onCreateCategoryClick(searchText)}
                className="inline rounded-lg bg-gray-300 px-2 py-1 text-xs font-medium lowercase text-gray-700">
                {searchText} (New Category)
              </button>
            </div>
          )}
          {filteredCategories.map((category) => {
            return (
              <div key={category.id} className="w-full">
                <button
                  onClick={() => onUpdateCategoryClick(category.id)}
                  className="inline rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
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
