import { Link } from 'react-router-dom';

export interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const SidebarButton = ({
  icon,
  label,
  href,
  onClick = () => {}
}: SidebarButtonProps) => {
  return href != null ? (
    <Link
      to={href}
      className="inline-flex items-center justify-start gap-x-2 whitespace-nowrap rounded-lg bg-transparent px-4 py-3 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      {icon}
      <span>{label}</span>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-start gap-x-2 whitespace-nowrap rounded-lg bg-transparent px-4 py-3 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      {icon}
      <span>{label}</span>
    </button>
  );
};
