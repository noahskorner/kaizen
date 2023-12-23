import './text-input.css';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ApiError } from '@kaizen/core';
import { InputErrors } from '../input-errors';

export interface TextInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  description?: string;
  errors?: ApiError[];
  min?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({
  id,
  name,
  label,
  value,
  placeholder,
  description,
  type = 'text',
  errors = [],
  min,
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2 text-sm">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      {description && <p className="text-xs text-neutral-700">{description}</p>}
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
        min={min}
        placeholder={placeholder}
        onChange={onChange}
      />
      <InputErrors errors={errors} />
    </div>
  );
}
