import { TextInput, Button, Toast } from '@kaizen/ui';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateUserRequest, CreateUserValidator } from '@kaizen/user';
import { ApiError, User } from '@kaizen/core';

const CREATE_USER_FORM_EMAIL_INPUT_ID = 'create-user-form-email-input';
const CREATE_USER_FORM_PASSWORD_INPUT_ID = 'create-user-form-password-input';
const userValidator = new CreateUserValidator();

export const CreateUserForm = () => {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<ApiError[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<ApiError[]>([]);
  const [errors, setErrors] = useState<ApiError[]>([]);

  const submitRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      return;
    }

    const request: CreateUserRequest = {
      email: email,
      password: password
    };

    fetch('http://localhost:3001/user', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'content-type': 'application/json'
      }
    }).then(async (res) => {
      if (res.status === 201) {
        const response: User = await res.json();
        console.log(response);
      } else {
        const response: ApiError[] = await res.json();
        setErrors(response);
      }
    });
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
        {errors.map((error) => {
          return (
            <Toast key={error.key} id={error.key} onDismiss={onDismissError}>
              {error.message}
            </Toast>
          );
        })}
        <form
          onSubmit={submitRegisterForm}
          className="flex w-full flex-col gap-y-2">
          <TextInput
            id={CREATE_USER_FORM_EMAIL_INPUT_ID}
            label="Email address"
            value={email}
            errors={emailErrors}
            onChange={onEmailChange}
          />
          <TextInput
            id={CREATE_USER_FORM_PASSWORD_INPUT_ID}
            type="password"
            label="Password"
            value={password}
            errors={passwordErrors}
            onChange={onPasswordChange}
          />
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
};
