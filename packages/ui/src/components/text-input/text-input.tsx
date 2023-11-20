import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({
  id,
  label,
  value,
  type = 'text',
  onChange
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2 text-sm text-gray-100">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="h-10 w-full rounded-lg border border-slate-900 bg-slate-800 px-2 outline-none focus:ring-2 focus:ring-indigo-900"
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
