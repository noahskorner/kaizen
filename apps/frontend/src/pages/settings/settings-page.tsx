import { TextInput } from '@kaizen/core-client';
import { ChangeEvent, useState } from 'react';

export const SettingsPage = () => {
  const [email, setEmail] = useState('');

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex w-full max-w-2xl flex-col gap-y-8">
        <div className="flex w-full flex-col gap-y-4 rounded-lg border border-neutral-500 bg-neutral-700">
          <div className="flex flex-col gap-y-6 px-6 pt-6">
            <h3 className="text-xl font-bold">Email</h3>
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Enter the email address you want to use to log in."
              placeholder="john.doe@company.com"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="flex flex-col items-end justify-center border-t border-neutral-500 px-6 py-4">
            <button
              type="button"
              className="focus rounded-lg bg-neutral-50 px-3 py-2 text-center text-sm font-medium text-neutral-950 focus:outline-none focus:ring-4">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
