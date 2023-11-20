export interface ToastProps {
  id: string;
  children: React.ReactNode;
  onDismiss?: (key: string) => void;
}

export const Toast = ({ id, children, onDismiss }: ToastProps) => {
  return (
    <div className="flex w-full items-center rounded-lg border border-slate-700 bg-slate-800 px-2 text-left">
      <div className="h-full w-2 border border-red-600 bg-red-600"></div>
      <p className="w-full px-2 py-3 text-sm">{children}</p>
      <button onClick={() => onDismiss?.(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
