export interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return (
    <button className="w-full rounded-lg bg-indigo-900 p-2 text-sm font-semibold text-white hover:bg-indigo-800 active:outline active:outline-1 active:outline-indigo-700">
      {label}
    </button>
  );
};
