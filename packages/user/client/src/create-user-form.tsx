import { TextInput, Button, useToastStore } from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateUserRequest, CreateUserValidator } from '@kaizen/user';
import { ApiError } from '@kaizen/core';
import { UserClient } from '.';
import { Link } from 'react-router-dom';

const CREATE_USER_FORM_EMAIL_INPUT_ID = 'create-user-form-email-input';
const CREATE_USER_FORM_PASSWORD_INPUT_ID = 'create-user-form-password-input';

export interface CreateUserFormProps {
  loginHref: string;
  onRegisterSuccess?: () => void;
}

export const CreateUserForm = ({
  loginHref,
  onRegisterSuccess = () => {}
}: CreateUserFormProps) => {
  const { addFailureToast } = useToastStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<ApiError[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<ApiError[]>([]);

  const submitRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailErrors = CreateUserValidator.validateEmail(email);
    const passwordErrors = CreateUserValidator.validatePassword(password);
    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      setEmailErrors(emailErrors);
      setPasswordErrors(passwordErrors);
      return;
    }

    setLoading(true);
    const request: CreateUserRequest = {
      email: email,
      password: password
    };
    const response = await UserClient.create(request);
    setLoading(false);

    if (response.type === 'FAILURE') {
      addFailureToast(response.errors);
    } else {
      onRegisterSuccess();
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailErrors(CreateUserValidator.validateEmail(event.target.value));
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordErrors(CreateUserValidator.validatePassword(event.target.value));
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-y-6 px-4">
      <form
        onSubmit={submitRegisterForm}
        className="flex w-full flex-col gap-y-2">
        <TextInput
          id={CREATE_USER_FORM_EMAIL_INPUT_ID}
          name="email"
          label="Email address"
          value={email}
          errors={emailErrors}
          onChange={onEmailChange}
        />
        <TextInput
          id={CREATE_USER_FORM_PASSWORD_INPUT_ID}
          name="password"
          type="password"
          label="Password"
          value={password}
          errors={passwordErrors}
          onChange={onPasswordChange}
        />
        <Button type="submit" disabled={loading}>
          Register
        </Button>
        <p className="text-sm">
          Already have an account?&nbsp;
          <Link to={loginHref} className="text-blue-800 hover:underline">
            Click here!
          </Link>
        </p>
      </form>
    </div>
  );
};
