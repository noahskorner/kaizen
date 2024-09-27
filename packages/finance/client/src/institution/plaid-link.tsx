import { usePlaidLink } from 'react-plaid-link';
import { useDispatch } from 'react-redux';
import { InstitutionDispatch, createInstitution } from '@kaizen/finance-client';
import { CreateInstitutionRequest } from '@kaizen/finance';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const dispatch = useDispatch<InstitutionDispatch>();

  const { open } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string) => {
      const request: CreateInstitutionRequest = {
        publicToken: public_token
      };
      dispatch(createInstitution(request));
    }
  });

  const onCreateClick = () => {
    open();
  };

  return (
    <button
      className="flex min-h-24 items-center justify-center gap-2 rounded-lg border border-green-700 bg-green-800 text-sm hover:border-green-600 hover:bg-green-700"
      onClick={onCreateClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
        />
      </svg>
      Add account
    </button>
  );
};
