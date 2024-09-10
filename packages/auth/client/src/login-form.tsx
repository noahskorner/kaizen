import { Button, Form, FormField, Input, Label } from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState } from 'react';
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

  const onSubmitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
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
    <div className="flex w-full flex-col gap-y-8">
      <div className="w-full">
        <h2 className="w-full scroll-m-20 pb-2 text-left text-3xl font-semibold tracking-tight first:mt-0">
          Lorem, ipsum dolor.
        </h2>
        <p className="w-full text-left text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet.
        </p>
      </div>
      <Form onSubmit={onSubmitLoginForm}>
        <FormField>
          <Label>Email address</Label>
          <Input
            id={LOGIN_FORM_EMAIL_INPUT_ID}
            name="email"
            value={email}
            onChange={onEmailChange}
          />
        </FormField>
        <FormField>
          <Label>Password</Label>
          <Input
            id={LOGIN_FORM_PASSWORD_INPUT_ID}
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </FormField>
        <Button variant="primary" disabled={isSubmitting} type="submit">
          Login
        </Button>
        <p className="text-center text-xs text-zinc-300">
          Need an account?&nbsp;
          <Button variant="link" asChild className="p-0">
            <Link to={registerHref} className="underline">
              Create one now
            </Link>
          </Button>
        </p>
      </Form>
    </div>
  );
};
