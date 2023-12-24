import { Toast } from './toast';
import { useToastStore } from './use-toast-store';

export const ToastManager = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col gap-y-2 p-2 md:max-w-md">
      {toasts.reverse().map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};
