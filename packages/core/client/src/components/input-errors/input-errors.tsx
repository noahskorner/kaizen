import { ApiError } from '@kaizen/core';

export interface InputErrorsProps {
  errors: ApiError[];
}

export const InputErrors = ({ errors }: InputErrorsProps) => {
  return (
    <ol>
      {errors.map((error) => (
        <li className="text-sm text-red-500" key={error.message}>
          {error.message}
        </li>
      ))}
    </ol>
  );
};
