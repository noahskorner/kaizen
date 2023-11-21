import { TextInput, Button, Toast } from '@kaizen/ui';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { ApiError } from '@kaizen/core';
import { authService } from '.';
import { LoginRequest } from '@kaizen/auth';
import { useAuthStore } from './use-auth-store';

const LOGIN_FORM_EMAIL_INPUT_ID = 'login-form-email-input';
const LOGIN_FORM_PASSWORD_INPUT_ID = 'login-form-password-input';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ApiError[]>([]);
  const authStore = useAuthStore();

  const onSubmitLoginForm = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    const request: LoginRequest = {
      email: email,
      password: password
    };
    const response = await authService.login(request);
    setLoading(false);
    if (response.type === 'SUCCESS') {
      authStore.login(response.data.accessToken);
      return onLoginSuccess();
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
    <div className="flex h-screen w-screen flex-col items-center justify-center">
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
            label="Email address"
            value={email}
            onChange={onEmailChange}
          />
          <TextInput
            id={LOGIN_FORM_PASSWORD_INPUT_ID}
            type="password"
            label="Password"
            value={password}
            onChange={onPasswordChange}
          />
          <Button disabled={loading} onClick={onSubmitLoginForm}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
