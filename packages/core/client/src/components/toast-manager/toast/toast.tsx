import { useEffect } from 'react';
import './toast.css';
import { useToastStore } from '../use-toast-store';

export const DEFAULT_TOAST_DURATION = 5000;

export interface ToastProps {
  id: string;
  title: React.ReactNode;
  message: React.ReactNode;
  duration?: number;
}

export const Toast = ({
  id,
  title,
  message,
  duration = DEFAULT_TOAST_DURATION
}: ToastProps) => {
  const { removeToast } = useToastStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => removeToast(id)}
      className="bg-neutral-0 bounce-in-from-top flex w-full cursor-pointer flex-col items-stretch gap-y-2 rounded-md border border-neutral-100 shadow md:max-w-md">
      <div className="flex h-full w-full items-stretch">
        <div className="flex-grow-1 ml-2 w-4 bg-red-300"></div>
        <div className="h-full w-full p-2">
          <h6 className="font-semibold">{title}</h6>
          <p className="text-sm text-neutral-600">{message}</p>
        </div>
      </div>
    </div>
  );
};
