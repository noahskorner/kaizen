'use client';

import { TextInput, Button } from '@kaizen/ui';
import { ChangeEvent, FormEvent, useState } from 'react';

const LOGIN_PAGE_EMAIL_INPUT_ID = 'login-page-email-input';
const LOGIN_PAGE_PASSWORD_INPUT_ID = 'login-page-password-input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Loggin in...');
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <form
        onSubmit={submitLoginForm}
        className="flex w-full max-w-sm flex-col gap-y-6 px-4">
        <TextInput
          id={LOGIN_PAGE_EMAIL_INPUT_ID}
          label="Email address"
          value={email}
          onChange={onEmailChange}
        />
        <TextInput
          id={LOGIN_PAGE_PASSWORD_INPUT_ID}
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <Button label="Login" />
      </form>
    </div>
  );
}
