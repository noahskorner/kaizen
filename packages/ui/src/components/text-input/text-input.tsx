import { ChangeEventHandler } from 'react';

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({ id, label, value, onChange }: TextInputProps) {
  return (
    <div className="text-gray-100 text-sm gap-y-2 flex flex-col">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        className="w-full h-10 bg-slate-800 border rounded-lg border-slate-900 outline-none px-2 focus:ring-2 focus:ring-indigo-900"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
