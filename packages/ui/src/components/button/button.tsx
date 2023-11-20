export interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {children}
    </button>
  );
};
