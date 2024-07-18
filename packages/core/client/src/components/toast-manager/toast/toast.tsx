import { useDispatch } from 'react-redux';
import { ToastDispatch } from '../toast.store';
import './toast.css';
import { deleteToastAction } from '../toast.actions';

export interface ToastProps {
  id: string;
  title: React.ReactNode;
  message?: React.ReactNode;
  duration?: number;
}

export const Toast = ({ id, title, message }: ToastProps) => {
  const dispatch = useDispatch<ToastDispatch>();

  const onToastClick = () => {
    dispatch(deleteToastAction(id));
  };

  return (
    <div
      onClick={onToastClick}
      className="bounce-in-from-top bg-neutral-0 flex w-full cursor-pointer flex-col items-stretch gap-y-2 rounded-md border border-neutral-100 shadow md:max-w-md">
      <div className="flex h-full w-full items-stretch">
        <div className="flex-grow-1 -my-[1px] ml-2 w-4  bg-red-500"></div>
        <div className="flex h-full w-full flex-col gap-y-2 p-4">
          <h6 className="font-semibold">{title}</h6>
          {message && <p className="text-sm text-neutral-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};
