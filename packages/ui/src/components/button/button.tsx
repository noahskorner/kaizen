export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button = ({ children, disabled = false }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {children}
    </button>
  );
};
