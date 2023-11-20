import { ButtonProps } from '../button';
import { Link as ReactRouterLink } from 'react-router-dom';

export interface LinkProps extends ButtonProps {
  to: string;
}

export const Link = ({ children, to }: LinkProps) => {
  return (
    <ReactRouterLink
      to={to}
      className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {children}
    </ReactRouterLink>
  );
};
