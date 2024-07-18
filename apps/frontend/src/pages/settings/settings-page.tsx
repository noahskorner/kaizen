import { selectEmail, selectUserId } from '@kaizen/auth-client';
import { ApiError } from '@kaizen/core';
import { TextInput } from '@kaizen/core-client';
import { UpdateEmailRequest, UpdateEmailValidator } from '@kaizen/user';
import { UpdateEmailClient } from '@kaizen/user-client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

export const SettingsPage = () => {
  const userId = useSelector(selectUserId);
  const email = useSelector(selectEmail);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [errors, setErrors] = useState<ApiError[]>([]);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedEmail = event.target.value;
    setUpdatedEmail(updatedEmail);
    setErrors([]);
  };

  const onSendVerificationEmailSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (userId == null)
      throw new Error('Something whent wrong, userId is null.');

    const errors = UpdateEmailValidator.validateEmail(updatedEmail);
    if (errors.length > 0) {
      setErrors([
        {
          code: errors[0].code,
          message: 'Must provide a valid email address.'
        } satisfies ApiError
      ]);
      return;
    }

    const response = await UpdateEmailClient.update({
      email: updatedEmail
    } satisfies UpdateEmailRequest);

    console.log(response);
  };

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex w-full max-w-2xl flex-col gap-y-8">
        <form
          onSubmit={onSendVerificationEmailSubmit}
          className="flex w-full flex-col gap-y-4 rounded-lg border border-zinc-500 bg-zinc-700">
          <div className="flex flex-col gap-y-6 p-6">
            <div>
              <h3 className="mb-6 text-xl font-bold">Email</h3>
              <TextInput
                id="email"
                name="email"
                type="email"
                disabled={true}
                value={email ?? ''}
              />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Enter the email address you want to use to log in with."
              placeholder="john.doe@company.com"
              errors={errors}
              value={updatedEmail}
              onChange={onEmailChange}
            />
          </div>
          <div className="flex flex-col items-end justify-center border-t border-zinc-500 px-6 py-4">
            <button
              type="submit"
              className="rounded-lg bg-zinc-50 px-3 py-2 text-center text-sm font-medium text-zinc-950 hover:bg-zinc-100 focus:outline-none">
              Send Verification Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
