import { ServiceError } from '@kaizen/core';
import {
  Button,
  Form,
  FormDescription,
  FormField,
  FormMessage,
  Input,
  Label,
  useToast
} from '@kaizen/core-client';
import { CreateUserValidator, UpdatePasswordRequest } from '@kaizen/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { UpdatePasswordClient } from './update-password.client';

export const UpdatePasswordForm = () => {
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [errors, setErrors] = useState<ServiceError[]>([]);
  const { toast } = useToast();

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedPassword(event.target.value);
    setErrors([]);
  };

  const onSendVerificationPasswordSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const errors = CreateUserValidator.validatePassword(updatedPassword);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const response = await UpdatePasswordClient.update({
      password: updatedPassword
    } satisfies UpdatePasswordRequest);

    if (response.type === 'SUCCESS') {
      toast({
        title: 'Succesfully changed password.',
        description: 'You can now log in with your new password.'
      });
    }
  };

  return (
    <Form
      onSubmit={onSendVerificationPasswordSubmit}
      className="flex w-full flex-col gap-y-4 rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="flex flex-col gap-y-6 p-6">
        <h3 className="text-xl font-bold">Password</h3>
        <FormField>
          <Label htmlFor="password">Enter your new password.</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={updatedPassword}
            onChange={onPasswordChange}
          />
          <FormDescription>
            Password must be at least 8 characters long and contain a number and
            a symbol.
          </FormDescription>
          {errors.map((error) => (
            <FormMessage key={error.code} message={error.code} />
          ))}
        </FormField>
      </div>
      <div className="flex flex-col items-end justify-center border-t border-zinc-800 px-6 py-4">
        <Button size="sm" type="submit" variant="destructive">
          Change my password
        </Button>
      </div>
    </Form>
  );
};
