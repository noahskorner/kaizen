import {
  formatCurrency,
  formatDate,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@kaizen/core-client';
import { Transaction } from '@kaizen/finance';
import { useState } from 'react';
import { UpdateTransactionForm } from './update-transaction-form';

export interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  const onTransactionUpdated = () => {
    setOpen(false);
  };

  return (
    <Sheet key={transaction.id} open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>
        <div
          key={transaction.id}
          className="flex w-full items-center justify-between gap-x-2 border-b border-zinc-800 p-2 hover:bg-zinc-900">
          <div className="flex w-4/12 items-center gap-x-2">
            {transaction.category == null && (
              <span className="size-2 rounded-full bg-blue-600"></span>
            )}
            {transaction.logoUrl ? (
              <img
                loading="lazy"
                className="h-8 w-8 flex-shrink-0 rounded-full"
                src={transaction.logoUrl}
              />
            ) : (
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-zinc-900"></div>
            )}
            <span className="text-left text-sm font-medium">
              {transaction.name}
            </span>
          </div>
          <span className="w-2/12 text-left">
            {transaction.category && (
              <span className="rounded-full bg-green-300 px-2 py-1 text-xs font-medium lowercase text-zinc-950">
                {transaction.category.name}
              </span>
            )}
          </span>
          <span className="w-2/12 text-left text-sm text-zinc-300">
            {formatDate(transaction.date)}
          </span>
          <span className="w-2/12 text-left text-sm text-zinc-300">
            {transaction.merchantName ?? ''}
          </span>
          <span className="w-2/12 text-right text-sm font-medium">
            {formatCurrency(transaction.amount, 'USD')}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 md:max-w-xl">
        <SheetHeader>
          <SheetTitle>Transaction details</SheetTitle>
          <SheetDescription>
            On {formatDate(transaction.date)}, you spent&nbsp;
            {formatCurrency(transaction.amount, 'USD')}&nbsp;at&nbsp;
            {transaction.merchantName ?? 'unknown'}. The transaction was
            recorded as &apos;{transaction.description}&apos; and is categorized
            under category.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <UpdateTransactionForm
          id={transaction.id}
          name={transaction.name ?? ''}
          amount={transaction.amount}
          merchantName={transaction.merchantName ?? ''}
          description={transaction.description ?? ''}
          category={transaction.category}
          onCancelClick={onCancelClick}
          onTransactionUpdated={onTransactionUpdated}
        />
      </SheetContent>
    </Sheet>
  );
};
