import { Button, ButtonGroup, Modal, TextInput } from '@kaizen/core-client';
import {
  CreateVirtualAccountRequest,
  VirtualAccountFrequency
} from '@kaizen/finance';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FREQUENCY_BUTTONS } from './frequency-buttons';

export const NAME_INPUT_ID = 'name-input';
export const STARTING_BALANCE_INPUT_ID = 'starting-balance-input';
export const DONATION_AMOUNT_INPUT_ID = 'donation-amount-input';

export const CreateVirtualAccountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState<VirtualAccountFrequency | null>(
    null
  );

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.valueAsNumber);
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
  };

  const onFrequencyChange = (values: string[]) => {
    setFrequency(values[0] as VirtualAccountFrequency);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: CreateVirtualAccountRequest = {
      name: name,
      balance: balance,
      amount: amount,
      frequency: frequency! // TODO: Actually validate this form
    };

    console.log(request);
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
              onChange={onNameChange}
            />
            <TextInput
              id={STARTING_BALANCE_INPUT_ID}
              name={'starting-balance'}
              label={'Starting Balance'}
              description="How much money do you want in this account?"
              value={balance}
              type="number"
              min={0}
              onChange={onBalanceChange}
            />
            <TextInput
              id={DONATION_AMOUNT_INPUT_ID}
              name={'donation-amount'}
              label={'Donation Amount'}
              value={amount}
              description="How much money do you want to contribute?"
              type="number"
              min={0}
              onChange={onAmountChange}
            />
            <ButtonGroup
              buttons={FREQUENCY_BUTTONS}
              description="How often do you want to contribute?"
              onChange={onFrequencyChange}
            />
          </div>
          <div className="px-4 pb-4">
            <div className="bottom-0 flex w-full justify-end gap-x-2 border-t pt-2">
              <Button onClick={() => setIsOpen(false)} style="neutral">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
