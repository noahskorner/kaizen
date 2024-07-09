import './text-input.css';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ApiError } from '@kaizen/core';
import { InputErrors } from '../input-errors';

export interface TextInputProps {
  id: string;
  name: string;
  label?: string;
  value: string | number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  description?: string;
  errors?: ApiError[];
  min?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({
  id,
  name,
  label,
  value,
  required,
  disabled,
  placeholder,
  description,
  type = 'text',
  errors = [],
  min,
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-6">
      {label && (
        <label
          className="block text-sm font-medium text-neutral-50"
          htmlFor={id}>
          {label}
        </label>
      )}
      {description && <p className="text-xs text-neutral-700">{description}</p>}
      <input
        className={`${
          errors.length > 0 ? 'ring-1 ring-red-600' : ''
        } ${disabled ? 'cursor-not-allowed bg-neutral-600 text-neutral-300' : 'bg-neutral-900 text-neutral-50'} block w-full rounded-lg border border-neutral-500 p-2.5 text-sm `}
        type={type}
        name={name}
        id={id}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {errors.length > 0 && <InputErrors errors={errors} />}
    </div>
  );
}
