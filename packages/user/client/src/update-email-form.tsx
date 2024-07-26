import { ServiceError } from '@kaizen/core';
import {
  Button,
  Form,
  FormField,
  FormMessage,
  Input,
  Label,
  useToast
} from '@kaizen/core-client';
import { UpdateEmailRequest, UpdateEmailValidator } from '@kaizen/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateEmailClient } from './update-email.client';
import { selectEmail } from '@kaizen/auth-client';

export const UpdateEmailForm = () => {
  const email = useSelector(selectEmail);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [errors, setErrors] = useState<ServiceError[]>([]);
  const { toast } = useToast();

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedEmail = event.target.value;
    setUpdatedEmail(updatedEmail);
    setErrors([]);
  };

  const onSendVerificationEmailSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const errors = UpdateEmailValidator.validateEmail(updatedEmail);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const response = await UpdateEmailClient.update({
      email: updatedEmail
    } satisfies UpdateEmailRequest);

    if (response.type === 'SUCCESS') {
      toast({
        title: 'Succesfully updated email.',
        description: 'Please check your email for verification.'
      });
    }
  };

  return (
    <Form
      onSubmit={onSendVerificationEmailSubmit}
      className="flex w-full flex-col gap-y-4 rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="flex flex-col gap-y-6 p-6">
        <div>
          <h3 className="mb-6 text-xl font-bold">Email</h3>
          <Input
            id="currentEmail"
            name="currentEmail"
            type="currentEmail"
            disabled={true}
            value={email ?? ''}
          />
        </div>
        <FormField>
          <Label htmlFor="email">
            Enter the email address you want to use to log in with.
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jon.snow@gmail.com"
            value={updatedEmail}
            onChange={onEmailChange}
          />
          {errors.map((error) => (
            <FormMessage key={error.code} message={error.code} />
          ))}
        </FormField>
      </div>
      <div className="flex flex-col items-end justify-center border-t border-zinc-800 px-6 py-4">
        <Button size="sm" type="submit">
          Send verification email
        </Button>
      </div>
    </Form>
  );
};
