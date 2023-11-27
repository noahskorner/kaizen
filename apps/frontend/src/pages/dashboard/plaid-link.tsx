import { usePlaidLink, PlaidLinkOnSuccessMetadata } from 'react-plaid-link';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const { open } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log({ public_token, metadata });
    }
  });

  const onCreateClick = () => {
    open();
  };

  return (
    <button
      onClick={onCreateClick}
      className="font-primary rounded-lg bg-indigo-800 px-4 py-2 text-xs hover:bg-indigo-900">
      Create
    </button>
  );
};
