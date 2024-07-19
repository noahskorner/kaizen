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
      className="inline-flex h-10 items-center justify-start gap-x-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      {icon}
      <span>{label}</span>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="inline-flex h-10 items-center justify-start gap-x-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      {icon}
      <span>{label}</span>
    </button>
  );
};
