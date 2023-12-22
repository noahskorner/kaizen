import './button.css';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  style?: 'primary' | 'neutral';
  className?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  to?: string;
}

export const Button = ({
  id,
  children,
  style = 'primary',
  className = 'w-full rounded-lg',
  type = 'button',
  active = false,
  disabled = false,
  onClick = () => {},
  to
}: ButtonProps) => {
  const buttonClassName = `button capitalize -${style} ${className} py-2 text-sm font-semibold px-4 ${
    active && '-active'
  }`;

  return to != null ? (
    <Link id={id} to={to} className={buttonClassName}>
      {children}
    </Link>
  ) : (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={buttonClassName}>
      {children}
    </button>
  );
};
