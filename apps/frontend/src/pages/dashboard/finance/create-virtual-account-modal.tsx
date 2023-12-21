import { Button, Modal, TextInput } from '@kaizen/core-client';
import { ChangeEvent, useState } from 'react';

export const STARTING_BALANCE_INPUT_ID = 'starting-balance-input';
export const DONATION_AMOUNT_INPUT_ID = 'donation-amount-input';

export const CreateVirtualAccountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startingBalance, setStartingBalance] = useState(0);

  const onStartingBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartingBalance(event.target.valueAsNumber);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Add virtual account</Button>
      <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
        <h6 className="-mt-6 mb-6 border-b font-bold">
          Create virtual account
        </h6>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <TextInput
              id={STARTING_BALANCE_INPUT_ID}
              name={'starting-balance'}
              label={'Starting Balance'}
              value={startingBalance}
              type="number"
              onChange={onStartingBalanceChange}
            />
            <TextInput
              id={DONATION_AMOUNT_INPUT_ID}
              name={'donation-amount'}
              label={'Donation Amount'}
              value={startingBalance}
              type="number"
              onChange={onStartingBalanceChange}
            />
            <div className="flex flex-col gap-y-2 text-sm">
              <label className="font-semibold">Donation Frequency</label>
              <div className="flex w-full">
                <button className="bg-primary-700 hover:bg-primary-800  active:outline-primary-700 w-full rounded-l-lg p-2 text-sm font-semibold text-white active:outline active:outline-1">
                  Weekly
                </button>
                <button className="bg-primary-700 hover:bg-primary-800 active:outline-primary-700 w-full p-2 text-sm font-semibold text-white active:outline active:outline-1">
                  Bi-Weekly
                </button>
                <button className="bg-primary-700 hover:bg-primary-800 active:outline-primary-700 w-full rounded-r-lg p-2 text-sm font-semibold text-white active:outline active:outline-1">
                  Monthly
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-x-2">
            <button className="rounded-lg bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-950  hover:bg-neutral-300 active:outline active:outline-1 active:outline-neutral-700">
              Cancel
            </button>
            <button className="bg-primary-700 hover:bg-primary-800  active:outline-primary-700 rounded-lg px-4 py-2 text-sm font-semibold text-white active:outline active:outline-1">
              Create
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
