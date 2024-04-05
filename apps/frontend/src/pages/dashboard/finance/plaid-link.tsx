import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@kaizen/core-client';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  // const { addFailureToast } = useToastStore();
  // const { addInstitution } = useInstitutionStore();
  // const { setTransactions } = useTransactionStore();
  const { open } = usePlaidLink({
    token: linkToken,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_public_token: string) => {
      // createInstitution(public_token);
    }
  });

  const onCreateClick = () => {
    open();
  };

  // const createInstitution = async (publicToken: string) => {
  //   const request: CreateInstitutionRequest = {
  //     publicToken: publicToken
  //   };
  //   const response = await InstitutionClient.create(request);
  //   if (response.type === 'SUCCESS') {
  //     addInstitution(response.data);
  //     loadTransactions();
  //   } else {
  //     addFailureToast(response.errors);
  //   }
  // };

  // const loadTransactions = async () => {
  //   const response = await TransactionClient.find({ page: 1 });
  //   if (response.type === 'SUCCESS') {
  //     setTransactions(response.data.hits);
  //   } else {
  //     addFailureToast(response.errors);
  //   }
  // };

  return <Button onClick={onCreateClick}>Add account</Button>;
};
