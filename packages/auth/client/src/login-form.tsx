import { TextInput, Button, useToastStore } from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { AuthClient } from '.';
import { LoginRequest } from '@kaizen/auth';
import { useAuthStore } from './use-auth-store';
import { Link } from 'react-router-dom';

const LOGIN_FORM_EMAIL_INPUT_ID = 'login-form-email-input';
const LOGIN_FORM_PASSWORD_INPUT_ID = 'login-form-password-input';

interface LoginFormProps {
  registerHref: string;
  email?: string;
  password?: string;
  onLoginSuccess: () => void;
}

export const LoginForm = ({
  email: initialEmail,
  password: initialPassword,
  registerHref,
  onLoginSuccess
}: LoginFormProps) => {
  const { addFailureToast } = useToastStore();
  const { login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(initialEmail ?? '');
  const [password, setPassword] = useState(initialPassword ?? '');

  const onSubmitLoginForm = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const request: LoginRequest = {
        email: email,
        password: password
      };
      const response = await AuthClient.login(request);
      if (response.type === 'SUCCESS') {
        login(response.data.accessToken);
        return onLoginSuccess();
      } else {
        addFailureToast(response.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-y-6 p-4">
      <form
        onSubmit={onSubmitLoginForm}
        className="flex w-full flex-col gap-y-2">
        <TextInput
          id={LOGIN_FORM_EMAIL_INPUT_ID}
          name="email"
          label="Email address"
          value={email}
          onChange={onEmailChange}
        />
        <TextInput
          id={LOGIN_FORM_PASSWORD_INPUT_ID}
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <Button
          disabled={isSubmitting}
          onClick={onSubmitLoginForm}
          type="submit">
          Login
        </Button>
        <p className="text-sm">
          Need an account?&nbsp;
          <Link to={registerHref} className="text-blue-800 hover:underline">
            Click here!
          </Link>
        </p>
      </form>
    </div>
  );
};
