import { usePlaidLink } from 'react-plaid-link';
import {
  InstitutionService,
  useInstitutionStore
} from '@kaizen/institution-client';
import { CreateInstitutionRequest } from '@kaizen/institution';

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLink = ({ linkToken }: PlaidLinkProps) => {
  const institutionStore = useInstitutionStore();
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
    const response = await InstitutionService.create(request);
    if (response.status === 201) {
      institutionStore.addInsitution(response.data);
    }
  };

  return (
    <button
      onClick={onCreateClick}
      className="font-primary rounded-lg bg-indigo-800 px-4 py-2 text-xs hover:bg-indigo-900">
      Create
    </button>
  );
};
