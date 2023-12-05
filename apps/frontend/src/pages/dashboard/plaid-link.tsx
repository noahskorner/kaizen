import { usePlaidLink } from 'react-plaid-link';
import { AccountService } from '@kaizen/account-client';
import { CreateAccountRequest } from '@kaizen/account';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const { open } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string) => {
      createAccount(public_token);
    }
  });

  const onCreateClick = () => {
    open();
  };

  const createAccount = async (publicToken: string) => {
    const request: CreateAccountRequest = {
      publicToken: publicToken
    };
    const response = await AccountService.create(request);
    console.log(response.data);
  };

  return (
    <button
      onClick={onCreateClick}
      className="font-primary rounded-lg bg-indigo-800 px-4 py-2 text-xs hover:bg-indigo-900">
      Create
    </button>
  );
};
