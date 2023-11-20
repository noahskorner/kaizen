export interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return (
    <button className="w-full bg-indigo-900 hover:bg-indigo-800 text-white p-2 rounded-lg text-sm font-semibold">
      {label}
    </button>
  );
};
