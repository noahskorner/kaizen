import {
  Button,
  Form,
  formatCurrency,
  formatDate,
  FormDescription,
  FormField,
  Input,
  Label,
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
                  {transaction.originalName}
                </h6>
                <span className="block text-sm text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
              <CategorySelector
                transactionId={transaction.id}
                selected={false}
                name={transaction.originalName ?? ''}
                onTransactionSelected={() => {}}
                onTransactionDeselected={() => {}}
              />
            </div>
            <span className="text-sm">
              {formatCurrency(transaction.originalAmount, 'USD')}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 md:max-w-xl">
        <SheetHeader>
          <SheetTitle>Transaction details</SheetTitle>
          <SheetDescription>
            On [date], you spent $[amount] at [merchantName]. The transaction
            was recorded as [originalDescription] and is categorized under
            [category].
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <Form>
          <FormField>
            <Label className="w-64 text-left capitalize  text-white">
              name
            </Label>
            <Input name="name" value={transaction.originalName ?? ''} />
            <FormDescription>The name of the transaction.</FormDescription>
          </FormField>
          <FormField>
            <Label className="w-64 text-left capitalize  text-white">
              Category
            </Label>
            <CategorySelector
              transactionId={transaction.id}
              selected={false}
              name={transaction.originalName ?? ''}
              onTransactionSelected={() => {}}
              onTransactionDeselected={() => {}}
            />
          </FormField>
          <FormField>
            <Label className="w-64 text-left capitalize  text-white">
              amount
            </Label>
            <Input name="amount" value={transaction.originalAmount} />
            <FormDescription>The amount of the transaction.</FormDescription>
          </FormField>
          <FormField>
            <Label className="w-64 text-left capitalize  text-white">
              merchant name
            </Label>
            <Input
              name="merchant-name"
              value={transaction.originalMerchantName ?? ''}
            />
            <FormDescription>The date of the transaction.</FormDescription>
          </FormField>
          <FormField>
            <Label className="w-64 text-left capitalize  text-white">
              description
            </Label>
            <Input
              name="description"
              value={transaction.originalDescription ?? ''}
            />
            <FormDescription>
              The description of the transaction.
            </FormDescription>
          </FormField>
          <div className="flex w-full flex-row gap-x-2">
            <Button
              type="button"
              onClick={onCancelClick}
              variant="secondary"
              className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
