import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ApiError } from '@kaizen/core';

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errors?: ApiError[];
}

export function TextInput({
  id,
  label,
  value,
  type = 'text',
  errors = [],
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2 text-sm text-gray-100">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`${
          errors.length > 0
            ? 'ring-2 ring-red-600'
            : 'ring-indigo-800 focus:ring-2'
        } h-10 w-full rounded-lg bg-slate-800 px-2 outline-none`}
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      />
      <ol>
        {errors.map((error) => (
          <li className="text-red-600" key={error.message}>
            {error.message}
          </li>
        ))}
      </ol>
    </div>
  );
}
