import { useClickOutside } from '@kaizen/core-client';
import { FindCategoriesResponse, Category as ICategory } from '@kaizen/finance';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { CategoryClient } from '.';

export interface CategoryProps {
  category: ICategory;
}

export const Category = ({ category }: CategoryProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<FindCategoriesResponse>({});
  const [filteredCategories, setFilteredCategories] =
    useState<FindCategoriesResponse>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setShowDropdown(false)
  );
  const inputRef = useRef<HTMLInputElement>(null);

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
      const response = await CategoryClient.find();

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
        {category.originalCategory}
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
              <button className="inline rounded-lg bg-gray-300 px-2 py-1 text-xs font-medium lowercase text-gray-700">
                {searchText} (New Category)
              </button>
            </div>
          )}
          {Object.entries(filteredCategories).map(([category]) => {
            return (
              <div key={category} className="w-full">
                <button className="inline rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium lowercase text-gray-700">
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
