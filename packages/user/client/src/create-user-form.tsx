import {
  Button,
  useToast,
  Input,
  FormField,
  Label,
  Form,
  FormMessage,
  FormDescription
} from '@kaizen/core-client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateUserRequest, CreateUserValidator } from '@kaizen/user';
import { ApiError } from '@kaizen/core';
import { UserClient } from '.';
import { Link } from 'react-router-dom';
import { ServiceErrorAdapter } from '@kaizen/core/src/service-error.adapter';

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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('noahskorner@gmail.com');
  const [emailErrors, setEmailErrors] = useState<ApiError[]>([]);
  const [password, setPassword] = useState('12345678a$');
  const [passwordErrors, setPasswordErrors] = useState<ApiError[]>([]);
  const { toast } = useToast();

  const onSubmitRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailErrors = CreateUserValidator.validateEmail(email).map(
      ServiceErrorAdapter.toApiError
    );
    const passwordErrors = CreateUserValidator.validatePassword(password).map(
      ServiceErrorAdapter.toApiError
    );
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
      toast({
        title: 'Unable to create new user.',
        description: response.errors.map((e) => e.message).join(' ')
      });
    } else {
      onRegisterSuccess();
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailErrors(
      CreateUserValidator.validateEmail(event.target.value).map(
        ServiceErrorAdapter.toApiError
      )
    );
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordErrors(
      CreateUserValidator.validatePassword(event.target.value).map(
        ServiceErrorAdapter.toApiError
      )
    );
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-y-6 p-4">
      <Form onSubmit={onSubmitRegisterForm}>
        <FormField>
          <Label className={`${emailErrors.length && 'text-destructive'}`}>
            Email address
          </Label>
          <Input
            id={CREATE_USER_FORM_EMAIL_INPUT_ID}
            name="email"
            value={email}
            onChange={onEmailChange}
          />
          <FormDescription>
            Enter the email you want to use to login with
          </FormDescription>
          {emailErrors.map((error) => (
            <FormMessage key={error.code} message={error.message} />
          ))}
        </FormField>
        <FormField>
          <Label className={`${passwordErrors.length && 'text-destructive'}`}>
            Password
          </Label>
          <Input
            id={CREATE_USER_FORM_PASSWORD_INPUT_ID}
            name="password"
            value={password}
            onChange={onPasswordChange}
          />
          {passwordErrors.map((error) => (
            <FormMessage key={error.code} message={error.message} />
          ))}
        </FormField>
        <Button type="submit" disabled={loading}>
          Register
        </Button>
        <p className="text-sm text-muted">
          Already have an account?&nbsp;
          <Button variant="link" asChild className="p-0">
            <Link to={loginHref}>Click here!</Link>
          </Button>
        </p>
      </Form>
    </div>
  );
};
