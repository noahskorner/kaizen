import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  to?: string;
}

const BUTTON_CLASS =
  'bg-primary-700 w-full rounded-lg p-2 text-sm font-semibold text-white hover:bg-primary-800 active:outline active:outline-1 active:outline-primary-700';

export const Button = ({
  id,
  children,
  type = 'button',
  disabled = false,
  onClick = () => {},
  to
}: ButtonProps) => {
  return to != null ? (
    <Link id={id} to={to} className={BUTTON_CLASS}>
      {children}
    </Link>
  ) : (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={BUTTON_CLASS}>
      {children}
    </button>
  );
};
