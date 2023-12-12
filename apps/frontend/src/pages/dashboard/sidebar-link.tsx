export interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const BUTTON_CLASS =
  'flex w-full cursor-pointer items-center justify-start rounded-lg p-2 hover:bg-primary-700 text-neutral-50';
const BUTTON_LABEL_CLASS = 'font-primary text-sm ml-3 font-normal';

export const SidebarButton = ({
  icon,
  label,
  href,
  onClick = () => {}
}: SidebarButtonProps) => {
  return href != null ? (
    <a href={href} className={BUTTON_CLASS}>
      {icon}
      <span className={BUTTON_LABEL_CLASS}>{label}</span>
    </a>
  ) : (
    <button onClick={onClick} className={BUTTON_CLASS}>
      {icon}
      <span className={BUTTON_LABEL_CLASS}>{label}</span>
    </button>
  );
};
