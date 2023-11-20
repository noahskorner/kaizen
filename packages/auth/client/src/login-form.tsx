import { TextInput, Button, Toast } from '@kaizen/ui';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateUserValidator } from '@kaizen/user';
import { ApiError } from '@kaizen/core';
import { AxiosError } from 'axios';
import { AuthService } from '.';
import { LoginRequest } from '@kaizen/auth';

const LOGIN_FORM_EMAIL_INPUT_ID = 'login-form-email-input';
const LOGIN_FORM_PASSWORD_INPUT_ID = 'login-form-password-input';
const userValidator = new CreateUserValidator();

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<ApiError[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<ApiError[]>([]);
  const [errors, setErrors] = useState<ApiError[]>([]);

  const submitRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailErrors = userValidator.validateEmail(email);
    const passwordErrors = userValidator.validatePassword(password);
    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      setEmailErrors(emailErrors);
      setPasswordErrors(passwordErrors);
      return;
    }

    setLoading(true);

    const request: LoginRequest = {
      email: email,
      password: password
    };

    try {
      const response = await AuthService.login(request);
      console.log(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      const response: ApiError[] = (error.response?.data as ApiError[]) ?? [];
      setErrors(response);
    } finally {
      setLoading(false);
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setEmail(event.target.value);
    setEmailErrors(userValidator.validateEmail(event.target.value));
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setPassword(event.target.value);
    setPasswordErrors(userValidator.validatePassword(event.target.value));
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
          onSubmit={submitRegisterForm}
          className="flex w-full flex-col gap-y-2">
          <TextInput
            id={LOGIN_FORM_EMAIL_INPUT_ID}
            label="Email address"
            value={email}
            errors={emailErrors}
            onChange={onEmailChange}
          />
          <TextInput
            id={LOGIN_FORM_PASSWORD_INPUT_ID}
            type="password"
            label="Password"
            value={password}
            errors={passwordErrors}
            onChange={onPasswordChange}
          />
          <Button disabled={loading}>Login</Button>
        </form>
      </div>
    </div>
  );
};
