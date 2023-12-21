import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ApiError } from '@kaizen/core';

export interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errors?: ApiError[];
}

export function TextInput({
  id,
  name,
  label,
  value,
  type = 'text',
  errors = [],
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2 text-sm">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`${
          errors.length > 0
            ? 'ring-1 ring-red-600'
            : 'ring-neutral-600 focus:ring-1'
        } h-10 w-full rounded-lg bg-neutral-100 px-2 outline-none`}
        type={type}
        name={name}
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
