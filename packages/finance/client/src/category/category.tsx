import { useClickOutside } from '@kaizen/core-client';
import { FindCategoriesResponse, UpdateCategoryRequest } from '@kaizen/finance';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  TransactionCategoryClient,
  TransactionDispatch,
  setTransactionCategory
} from '../transaction';
import { useDispatch } from 'react-redux';

export interface CategoryProps {
  transactionId: string;
  categoryId: string;
  originalCategory: string;
}

export const Category = ({
  transactionId,
  categoryId,
  originalCategory
}: CategoryProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<FindCategoriesResponse>({});
  const [filteredCategories, setFilteredCategories] =
    useState<FindCategoriesResponse>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setShowDropdown(false)
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<TransactionDispatch>();

  const onCategoryClick = () => {
    setShowDropdown(!showDropdown);
  };

  const onCategorySearch = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
    const newFilteredCategories = Object.entries(categories)
      .filter(([category]) => {
        return category
          .toLowerCase()
          .includes(event.currentTarget.value.toLocaleLowerCase());
      })
      .reduce((prev, [category, count]) => {
        prev[category] = count;
        return prev;
      }, {} as FindCategoriesResponse);
    setFilteredCategories(newFilteredCategories);
  };

  const onCategorySelect = async (category: string) => {
    const response = await TransactionCategoryClient.update(
      transactionId,
      categoryId,
      {
        userCategory: category
      } satisfies UpdateCategoryRequest
    );

    if (response.type === 'SUCCESS') {
      dispatch(
        setTransactionCategory({
          transactionId: transactionId,
          category: response.data
        })
      );
    }

    setShowDropdown(false);
  };

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [inputRef, showDropdown]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  // TODO: We need to pull these from the store instead
  useEffect(() => {
    const loadCategories = async () => {
      const response = await TransactionCategoryClient.find();

      if (response.type === 'SUCCESS') {
        setCategories(response.data);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={onCategoryClick}
        className="rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
        {originalCategory}
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
                onClick={() => onCategorySelect(searchText)}
                className="inline rounded-lg bg-gray-300 px-2 py-1 text-xs font-medium lowercase text-gray-700">
                {searchText} (New Category)
              </button>
            </div>
          )}
          {Object.entries(filteredCategories).map(([category]) => {
            return (
              <div key={category} className="w-full">
                <button
                  onClick={() => onCategorySelect(category)}
                  className="inline rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
                  {category}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
