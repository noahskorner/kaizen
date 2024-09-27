import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsesVerticalIcon,
  formatCurrency
} from '@kaizen/core-client';
import { Account } from '@kaizen/finance';
import { DeleteAccountButton } from './delete-account-button';

export interface AccountCardProps {
  account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <div
      key={account.id}
      className="relative flex w-full items-center justify-between rounded-lg border border-zinc-800 px-4 py-6 hover:bg-zinc-900">
      <div>
        <h6 className="scroll-m-20 text-sm font-semibold tracking-tight">
          {account.name}
        </h6>
        <span className="text-sm text-muted-foreground">({account.mask})</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="scroll-m-20 text-sm font-semibold tracking-tight">
          {formatCurrency(account.available ?? 0, 'USD')}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsesVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <DeleteAccountButton
                key={account.id}
                accountId={account.id}
                name={account.name ?? ''}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
