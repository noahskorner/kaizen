import { Button, ButtonGroup, Modal, TextInput } from '@kaizen/core-client';
import {
  CreateVirtualAccountRequest,
  CreateVirtualAccountValidator,
  VirtualAccountFrequency
} from '@kaizen/finance';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { FREQUENCY_BUTTONS } from './frequency-buttons';
import { ApiError } from '@kaizen/core';
import {
  VirtualAccountClient,
  useVirtualAccountStore
} from '@kaizen/finance-client';

export const NAME_INPUT_ID = 'name-input';
export const STARTING_BALANCE_INPUT_ID = 'starting-balance-input';
export const DONATION_AMOUNT_INPUT_ID = 'donation-amount-input';

export const CreateVirtualAccountModal = () => {
  const { addVirtualAccount } = useVirtualAccountStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameErrors, setNameErrors] = useState<ApiError[]>([]);
  const [balance, setBalance] = useState(0);
  const [balanceErrors, setBalanceErrors] = useState<ApiError[]>([]);
  const [amount, setAmount] = useState(0);
  const [amountErrors, setAmountErrors] = useState<ApiError[]>([]);
  const [frequency, setFrequency] = useState<VirtualAccountFrequency | null>(
    null
  );
  const [frequencyErrors, setFrequencyErrors] = useState<ApiError[]>([]);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameErrors(
      CreateVirtualAccountValidator.validateName(event.target.value)
    );
  };

  const onBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.valueAsNumber);
    setBalanceErrors(
      CreateVirtualAccountValidator.validateBalance(event.target.valueAsNumber)
    );
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
    setAmountErrors(
      CreateVirtualAccountValidator.validateAmount(event.target.valueAsNumber)
    );
  };

  const onFrequencyChange = (values: string[]) => {
    setFrequency(values[0] as VirtualAccountFrequency);
    setFrequencyErrors(
      CreateVirtualAccountValidator.validateFrequency(values[0])
    );
  };

  const onSubmit = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const request: CreateVirtualAccountRequest = {
      name: name,
      balance: balance,
      amount: amount,
      frequency: frequency!
    };
    const response = await VirtualAccountClient.create(request);

    if (response.type === 'FAILURE') {
      // TODO: Form errors go here
      console.error(response.errors);
    } else {
      addVirtualAccount(response.data);
    }

    setIsOpen(false);
  };

  const validateForm = () => {
    const nameErrors = CreateVirtualAccountValidator.validateName(name);
    setNameErrors(nameErrors);
    const balanceErrors =
      CreateVirtualAccountValidator.validateBalance(balance);
    setBalanceErrors(balanceErrors);
    const amountErrors = CreateVirtualAccountValidator.validateAmount(amount);
    setAmountErrors(amountErrors);
    const frequencyErrors = CreateVirtualAccountValidator.validateFrequency(
      frequency as unknown as string
    );
    setFrequencyErrors(frequencyErrors);

    return (
      nameErrors.length === 0 &&
      balanceErrors.length === 0 &&
      amountErrors.length === 0 &&
      frequencyErrors.length === 0
    );
  };

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Add virtual account</Button>
      <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
        <div className="mb-2 p-4">
          <h6 className="border-b pb-2 font-bold">Create virtual account</h6>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex h-full flex-col justify-between gap-y-8 overflow-hidden">
          <div className="flex max-h-full flex-col gap-y-2 overflow-y-auto px-4">
            <TextInput
              id={NAME_INPUT_ID}
              name={'name'}
              label={'Name'}
              placeholder="Savings"
              value={name}
              errors={nameErrors}
              onChange={onNameChange}
            />
            <TextInput
              id={STARTING_BALANCE_INPUT_ID}
              name={'starting-balance'}
              label={'Starting Balance'}
              description="How much money do you want in this account?"
              value={balance}
              errors={balanceErrors}
              type="number"
              min={0}
              onChange={onBalanceChange}
            />
            <TextInput
              id={DONATION_AMOUNT_INPUT_ID}
              name={'donation-amount'}
              label={'Donation Amount'}
              value={amount}
              errors={amountErrors}
              description="How much money do you want to contribute?"
              type="number"
              min={0}
              onChange={onAmountChange}
            />
            <ButtonGroup
              buttons={FREQUENCY_BUTTONS}
              errors={frequencyErrors}
              description="How often do you want to contribute?"
              onChange={onFrequencyChange}
            />
          </div>
          <div className="px-4 pb-4">
            <div className="bottom-0 flex w-full justify-end gap-x-2 border-t pt-2">
              <Button onClick={() => setIsOpen(false)} style="neutral">
                Cancel
              </Button>
              <Button type="submit" onClick={onSubmit}>
                Create
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
