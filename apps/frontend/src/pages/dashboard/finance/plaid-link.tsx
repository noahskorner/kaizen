import { usePlaidLink } from 'react-plaid-link';
import {
  InstitutionClient,
  TransactionClient,
  useInstitutionStore
} from '@kaizen/finance-client';
import { CreateInstitutionRequest } from '@kaizen/finance';
import { Button, useToastStore } from '@kaizen/core-client';
import { useTransactionStore } from '@kaizen/finance-client/src/use-transaction-store';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const { addFailureToast } = useToastStore();
  const { addInstitution } = useInstitutionStore();
  const { setTransactions } = useTransactionStore();
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
      loadTransactions();
    } else {
      addFailureToast(response.errors);
    }
  };

  const loadTransactions = async () => {
    const response = await TransactionClient.find({ page: 1 });
    if (response.type === 'SUCCESS') {
      setTransactions(response.data.hits);
    } else {
      addFailureToast(response.errors);
    }
  };

  return <Button onClick={onCreateClick}>Add account</Button>;
};
