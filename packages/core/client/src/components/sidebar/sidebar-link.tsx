import { Link } from 'react-router-dom';

export interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const BUTTON_CLASS =
  'flex w-full cursor-pointer items-center justify-start rounded-lg p-2 hover:bg-zinc-800 text-zinc-50';
const BUTTON_LABEL_CLASS = 'font-primary text-sm ml-3 font-normal';

export const SidebarButton = ({
  icon,
  label,
  href,
  onClick = () => {}
}: SidebarButtonProps) => {
  return href != null ? (
    <Link to={href} className={BUTTON_CLASS}>
      {icon}
      <span className={BUTTON_LABEL_CLASS}>{label}</span>
    </Link>
  ) : (
    <button onClick={onClick} className={BUTTON_CLASS}>
      {icon}
      <span className={BUTTON_LABEL_CLASS}>{label}</span>
    </button>
  );
};
