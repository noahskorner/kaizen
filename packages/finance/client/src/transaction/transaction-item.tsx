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
import { CategorySelector } from '../category/category.selector';
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
          className="flex w-full items-center justify-center gap-x-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
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
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-zinc-800"></div>
          )}
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-row items-center justify-start gap-2">
              <div className="flex flex-col items-start gap-2">
                <h6 className="scroll-m-20 text-sm font-semibold tracking-tight">
                  {transaction.name}
                </h6>
                <span className="block text-sm text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
              <CategorySelector
                transactionId={transaction.id}
                selected={false}
                name={'category'}
                onTransactionSelected={() => {}}
                onTransactionDeselected={() => {}}
              />
            </div>
            <span className="text-sm">
              {formatCurrency(transaction.amount, 'USD')}
            </span>
          </div>
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
          onCancelClick={onCancelClick}
          onTransactionUpdated={onTransactionUpdated}
        />
      </SheetContent>
    </Sheet>
  );
};
