import {
  Button,
  Form,
  FormDescription,
  FormField,
  FormMessage,
  Input,
  Label,
  useToast
} from '@kaizen/core-client';
import { CategorySelector } from '../category/category.selector';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { UpdateTransactionClient } from './update-transaction.client';
import {
  Transaction,
  UpdateTransactionRequest,
  UpdateTransactionValidator
} from '@kaizen/finance';
import { useDispatch } from 'react-redux';
import { TransactionDispatch } from './transaction.store';
import { setTransactionAction } from './transaction.actions';
import { ErrorCode } from '@kaizen/core';

export interface UpdateTransactionFormProps {
  id: string;
  name: string;
  amount: number;
  merchantName: string;
  description: string;
  onCancelClick: MouseEventHandler<HTMLButtonElement>;
  onTransactionUpdated: (transaction: Transaction) => void;
}

export const UpdateTransactionForm = ({
  id,
  name: initialName,
  amount: initialAmount,
  merchantName: initialMerchantName,
  description: initialDescription,
  onCancelClick,
  onTransactionUpdated
}: UpdateTransactionFormProps) => {
  const [name, setName] = useState(initialName);
  const [nameErrors, setNameErrors] = useState<ErrorCode[]>([]);
  const [amount, setAmount] = useState(initialAmount);
  const [amountErrors, setAmountErrors] = useState<ErrorCode[]>([]);
  const [merchantName, setMerchantName] = useState(initialMerchantName);
  const [merchantNameErrors, setMerchantNameErrors] = useState<ErrorCode[]>([]);
  const [description, setDescription] = useState(initialDescription);
  const [descriptionErrors, setDescriptionErrors] = useState<ErrorCode[]>([]);

  const { toast } = useToast();
  const dispatch = useDispatch<TransactionDispatch>();

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
  };

  const onMerchantNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMerchantName(event.target.value);
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onUpdateTransactionSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const request: UpdateTransactionRequest = {
      id: id,
      name: name === initialName ? undefined : name,
      amount: amount === initialAmount ? undefined : amount,
      merchantName:
        merchantName === initialMerchantName ? undefined : merchantName,
      description: description === initialDescription ? undefined : description
    };

    const nameErrors = UpdateTransactionValidator.validateName(request);
    setNameErrors(nameErrors);
    const amountErrors = UpdateTransactionValidator.validateAmount(request);
    setAmountErrors(amountErrors);
    const merchantNameErrors =
      UpdateTransactionValidator.validateMerchantName(request);
    setMerchantNameErrors(merchantNameErrors);
    const descriptionErrors =
      UpdateTransactionValidator.validateDescription(request);
    setDescriptionErrors(descriptionErrors);

    if (
      nameErrors.length > 0 ||
      amountErrors.length > 0 ||
      merchantNameErrors.length > 0 ||
      descriptionErrors.length > 0
    ) {
      return;
    }

    const response = await UpdateTransactionClient.update(request);

    if (response.type === 'FAILURE') {
      return toast({
        title: 'Unable to update transaction.',
        description: response.errors.map((e) => e.message).join(' ')
      });
    }

    dispatch(setTransactionAction(response.data));
    toast({
      title: 'Success!',
      description: 'The transaction has been successfully updated.'
    });
    onTransactionUpdated(response.data);
  };

  return (
    <Form onSubmit={onUpdateTransactionSubmit}>
      <FormField>
        <Label
          className={`${nameErrors.length > 0 ? 'text-destructive' : 'text-white'} w-64 text-left capitalize `}>
          name
        </Label>
        <Input name="name" value={name} onChange={onNameChange} />
        <FormDescription>The name of the transaction.</FormDescription>
        {nameErrors.map((error) => (
          <FormMessage key={error} message={error} />
        ))}
      </FormField>
      <FormField>
        <Label className="w-64 text-left capitalize  text-white">
          Category
        </Label>
        <CategorySelector
          transactionId={id}
          selected={false}
          name={'category'}
          onTransactionSelected={() => {}}
          onTransactionDeselected={() => {}}
        />
      </FormField>
      <FormField>
        <Label
          className={`${amountErrors.length > 0 ? 'text-destructive' : 'text-white'} w-64 text-left capitalize `}>
          amount
        </Label>
        <Input
          name="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={onAmountChange}
        />
        <FormDescription>The amount of the transaction.</FormDescription>
        {amountErrors.map((error) => (
          <FormMessage key={error} message={error} />
        ))}
      </FormField>
      <FormField>
        <Label
          className={`${merchantNameErrors.length > 0 ? 'text-destructive' : 'text-white'} w-64 text-left capitalize `}>
          merchant name
        </Label>
        <Input
          name="merchant-name"
          value={merchantName}
          onChange={onMerchantNameChange}
        />
        <FormDescription>The date of the transaction.</FormDescription>
        {merchantNameErrors.map((error) => (
          <FormMessage key={error} message={error} />
        ))}
      </FormField>
      <FormField>
        <Label
          className={`${descriptionErrors.length > 0 ? 'text-destructive' : 'text-white'} w-64 text-left capitalize `}>
          description
        </Label>
        <Input
          name="description"
          value={description}
          onChange={onDescriptionChange}
        />
        <FormDescription>The description of the transaction.</FormDescription>
        {descriptionErrors.map((error) => (
          <FormMessage key={error} message={error} />
        ))}
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
  );
};
