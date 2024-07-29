import { useSelector } from 'react-redux';
import { selectTransactions } from './transaction.selectors';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { useState } from 'react';

export const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const onTransactionSelected = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const onTransactionDeselected = () => {
    setSelectedTransactionId(null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {transactions.map((transaction) => {
        return (
          <Sheet key={transaction.id}>
            <SheetTrigger>
              <div
                key={transaction.id}
                className="flex w-full items-center justify-center gap-x-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
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
                  <div className="flex w-full flex-col items-start gap-3 lg:flex-row lg:items-center">
                    <div>
                      <h6 className="scroll-m-20 text-sm font-semibold tracking-tight">
                        {transaction.name}
                      </h6>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                    <CategorySelector
                      transactionId={transaction.id}
                      selected={selectedTransactionId === transaction.id}
                      name={
                        transaction.category
                          ? transaction.category.name
                          : transaction.originalCategory
                            ? transaction.originalCategory
                            : ''
                      }
                      onTransactionSelected={onTransactionSelected}
                      onTransactionDeselected={onTransactionDeselected}
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
                  On [date], you spent $[amount] at [merchantName]. The
                  transaction was recorded as [originalDescription] and is
                  categorized under [category].
                </SheetDescription>
              </SheetHeader>
              <Separator />
              {/* <div className="flex items-center gap-4">
                <Avatar>
                  {transaction.logoUrl ? (
                    <AvatarImage src={transaction.logoUrl} />
                  ) : transaction.originalIconUrl ? (
                    <AvatarImage src={transaction.originalIconUrl} />
                  ) : (
                    <AvatarFallback />
                  )}
                  <AvatarFallback />
                </Avatar>
                <div className="flex w-full flex-col gap-2">
                  <h6 className="text-md font-semibold text-zinc-50">
                    {transaction.name}
                  </h6>
                  {transaction.originalDescription && (
                    <span className="block text-sm text-muted-foreground">
                      {transaction.originalDescription}
                    </span>
                  )}
                  <span className="block text-sm font-medium text-zinc-300">
                    {formatCurrency(transaction.amount, 'USD')}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
              <Separator /> */}

              <Form>
                <FormField>
                  <Label className="w-64 text-left capitalize  text-white">
                    name
                  </Label>
                  <Input name="name" value={transaction.name} />
                  <FormDescription>
                    The name of the transaction.
                  </FormDescription>
                </FormField>
                <FormField>
                  <Label className="w-64 text-left capitalize  text-white">
                    Category
                  </Label>
                  <CategorySelector
                    transactionId={transaction.id}
                    selected={false}
                    name={transaction.name ?? ''}
                    onTransactionSelected={() => {}}
                    onTransactionDeselected={() => {}}
                  />
                </FormField>
                <FormField>
                  <Label className="w-64 text-left capitalize  text-white">
                    amount
                  </Label>
                  <Input name="amount" value={transaction.amount} />
                  <FormDescription>
                    The amount of the transaction.
                  </FormDescription>
                </FormField>
                <FormField>
                  <Label className="w-64 text-left capitalize  text-white">
                    date
                  </Label>
                  <Input name="date" value={transaction.date} />
                  <FormDescription>
                    The date of the transaction.
                  </FormDescription>
                </FormField>
                <FormField>
                  <Label className="w-64 text-left capitalize  text-white">
                    description
                  </Label>
                  <Input
                    name="description"
                    value={transaction.originalDescription}
                  />
                  <FormDescription>
                    The description of the transaction.
                  </FormDescription>
                </FormField>
                <div className="flex w-full flex-row gap-x-2">
                  <Button variant="destructive" className="w-full">
                    Reset
                  </Button>
                  <Button type="submit" className="w-full">
                    Save changes
                  </Button>
                </div>
              </Form>
            </SheetContent>
          </Sheet>
        );
      })}
    </div>
  );
};
