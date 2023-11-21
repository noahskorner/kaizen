import { MouseEventHandler } from 'react';

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = ({
  id,
  children,
  type = 'button',
  disabled = false,
  onClick = () => {}
}: ButtonProps) => {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {children}
    </button>
  );
};
