import { MouseEventHandler } from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  disabled = false,
  onClick = () => {}
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {children}
    </button>
  );
};
