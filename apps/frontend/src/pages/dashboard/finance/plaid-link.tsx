import { usePlaidLink } from 'react-plaid-link';
import { InstitutionClient, useInstitutionStore } from '@kaizen/finance-client';
import { CreateInstitutionRequest } from '@kaizen/finance';
import { Button } from '@kaizen/ui';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const { addInstitution } = useInstitutionStore();
  const { open } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string) => {
      createInstitution(public_token);
    }
  });

  const onCreateClick = () => {
    open();
  };

  const createInstitution = async (publicToken: string) => {
    const request: CreateInstitutionRequest = {
      publicToken: publicToken
    };
    const response = await InstitutionClient.create(request);
    if (response.type === 'SUCCESS') {
      addInstitution(response.data);
    }
  };

  return <Button onClick={onCreateClick}>Add account</Button>;
};
