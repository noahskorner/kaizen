import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@kaizen/core-client';
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

  return <Button onClick={onCreateClick}>Add account</Button>;
};
