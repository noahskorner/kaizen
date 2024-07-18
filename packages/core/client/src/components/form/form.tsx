/* eslint-disable react/prop-types */
import * as React from 'react';
import { cn } from '../../utils/cn';

const Form = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn('flex w-full flex-col gap-y-4', className)}
      {...props}
    />
  );
});
Form.displayName = 'Form';

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
});
FormField.displayName = 'FormField';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    message: string;
  }
>(({ message, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-destructive text-sm font-medium', className)}
      {...props}>
      {message}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

export { Form, FormField, FormMessage, FormDescription };
