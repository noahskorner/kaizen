import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  useToast
} from '@kaizen/core-client';
import { useState } from 'react';
import { DeleteAccountClient } from './delete-account.client';
import { useDispatch } from 'react-redux';
import { InstitutionDispatch, loadInstitutions } from '../institution';

export interface DeleteAccountButtonProps {
  accountId: string;
  name: string;
}

export const DeleteAccountButton = ({
  accountId,
  name
}: DeleteAccountButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch<InstitutionDispatch>();

  const onDeleteAccountClick = async () => {
    setDisabled(true);
    const response = await DeleteAccountClient.delete({ accountId });
    if (response.type === 'FAILURE') {
      toast({
        title: 'Unable to remove account.',
        description: 'Please try again.'
      });
    } else {
      dispatch(loadInstitutions());
      toast({
        title: 'Account succesfully removed!',
        description: 'The account has been removed.'
      });
    }
    setDisabled(false);
    setDeleteAccountOpen(false);
  };

  const onDialogClose = (open: boolean) => {
    setDeleteAccountOpen(open);
    setDisabled(false);
  };

  return (
    <Dialog
      key={accountId}
      open={deleteAccountOpen}
      onOpenChange={onDialogClose}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="destructive" key={accountId}>
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove {name}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will remove the account,
            it&apos;s transactions, and any historical data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            disabled={disabled}
            variant="destructive"
            onClick={onDeleteAccountClick}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
