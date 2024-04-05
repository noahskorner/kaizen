import { useSelector } from 'react-redux';
import { selectToasts } from './toast.selectors';
import { Toast } from './toast/toast';

export const ToastManager = () => {
  const toasts = useSelector(selectToasts);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col gap-y-2 p-2 md:max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};
