import {
  SidebarDispatch,
  toggleSidebarAction,
  Button,
  Input,
  formatCurrency
} from '@kaizen/core-client';
import {
  InstitutionDispatch,
  selectNetworth,
  syncInstitutions
} from '@kaizen/finance-client';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';

export const Navbar = () => {
  const dispatch = useDispatch<SidebarDispatch & InstitutionDispatch>();
  const networth = useSelector(selectNetworth);

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  const onRefreshAccountsClick = () => {
    dispatch(syncInstitutions());
  };

  return (
    <div className="fixed top-0 z-10 flex h-12 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 bg-opacity-60 px-2 backdrop-blur-md">
      <div className="">
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
          className="rounded-lg p-2 text-zinc-50 hover:bg-zinc-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex w-full items-center gap-2">
          <Form className="w-full">
            <Input
              className="h-8 text-xs dark:bg-zinc-900"
              placeholder="(Coming soon!) Search for anything "
              disabled={true}
            />
          </Form>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm font-medium leading-none tracking-tight">
          {formatCurrency(networth, 'USD')}
        </span>
        <button
          onClick={onRefreshAccountsClick}
          className="flex items-center gap-1 rounded-lg border border-green-700 bg-green-800 px-4 py-1 text-xs font-bold hover:border-green-600 hover:bg-green-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
};
