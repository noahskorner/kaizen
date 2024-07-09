import { selectEmail, selectUserId } from '@kaizen/auth-client';
import { ApiError } from '@kaizen/core';
import { TextInput } from '@kaizen/core-client';
import { UpdateUserEmailRequest, UpdateUserEmailValidator } from '@kaizen/user';
import { UpdateUserEmailClient } from '@kaizen/user-client';
import { ChangeEvent, useState } from 'react';
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

  const onSendVerificationEmailClick = async () => {
    if (userId == null)
      throw new Error('Something whent wrong, userId is null.');

    const errors = UpdateUserEmailValidator.validateEmail(updatedEmail);
    if (errors.length > 0) {
      setErrors([
        {
          code: errors[0].code,
          message: 'Must provide a valid email address.'
        } satisfies ApiError
      ]);
      return;
    }

    const response = await UpdateUserEmailClient.update({
      userId: userId,
      email: updatedEmail
    } satisfies UpdateUserEmailRequest);
    console.log(response);
  };

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex w-full max-w-2xl flex-col gap-y-8">
        <div className="flex w-full flex-col gap-y-4 rounded-lg border border-neutral-500 bg-neutral-700">
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
          <div className="flex flex-col items-end justify-center border-t border-neutral-500 px-6 py-4">
            <button
              onClick={onSendVerificationEmailClick}
              type="button"
              className="rounded-lg bg-neutral-50 px-3 py-2 text-center text-sm font-medium text-neutral-950 hover:bg-neutral-100 focus:outline-none">
              Send Verification Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
