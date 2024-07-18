import { Button, Input } from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { LoginRequest } from '@kaizen/auth';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './auth.effects';
import { AuthDispatch } from '.';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(initialEmail ?? 'noahskorner@gmail.com');
  const [password, setPassword] = useState(initialPassword ?? '12345678a$');
  const dispatch = useDispatch<AuthDispatch>();

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
      dispatch(login(request, onLoginSuccess));
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
        <Input
          id={LOGIN_FORM_EMAIL_INPUT_ID}
          name="email"
          // label="Email address"
          value={email}
          onChange={onEmailChange}
        />
        <Input
          id={LOGIN_FORM_PASSWORD_INPUT_ID}
          name="password"
          type="password"
          // label="Password"
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
          <Link to={registerHref} className="text-blue-400 hover:underline">
            Click here!
          </Link>
        </p>
      </form>
    </div>
  );
};
