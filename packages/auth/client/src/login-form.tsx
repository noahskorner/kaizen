import { TextInput, Button, Toast } from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { ApiError } from '@kaizen/core';
import { AuthClient } from '.';
import { LoginRequest } from '@kaizen/auth';
import { useAuthStore } from './use-auth-store';

const LOGIN_FORM_EMAIL_INPUT_ID = 'login-form-email-input';
const LOGIN_FORM_PASSWORD_INPUT_ID = 'login-form-password-input';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ApiError[]>([]);
  const { login } = useAuthStore();

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
        setErrors(response.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setPassword(event.target.value);
  };

  const onDismissError = (key: string) => {
    setErrors(errors.filter((error) => error.key !== key));
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-y-6 px-4">
      <div className="flex flex-col gap-y-2">
        {errors.map((error) => {
          return (
            <Toast key={error.key} id={error.key} onDismiss={onDismissError}>
              {error.message}
            </Toast>
          );
        })}
      </div>
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
      </form>
    </div>
  );
};
