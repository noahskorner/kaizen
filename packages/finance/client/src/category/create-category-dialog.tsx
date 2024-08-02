import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  Input,
  Label,
  useToast
} from '@kaizen/core-client';
import { CreateCategoryRequest } from '@kaizen/finance';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CategoryClient } from './category.client';
import { useDispatch } from 'react-redux';
import { CategoryDispatch } from './category.store';
import { addCategoryAction } from './category.actions';

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch<CategoryDispatch>();
  const { toast } = useToast();

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onCancelClick = () => {
    setOpen(false);
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  const onCreateCategory = async (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const request: CreateCategoryRequest = {
      name: name,
      parentId: null
    };

    const response = await CategoryClient.create(request);
    if (response.type === 'FAILURE') {
      toast({
        title: 'Unable to add category',
        description: response.errors.map((error) => error.message).join(', ')
      });
      return;
    }

    dispatch(addCategoryAction(response.data));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="link" size="pill">
          &#x2b;&nbsp;Add category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
          <Form onSubmit={onCreateCategory}>
            <FormField>
              <Label>Name</Label>
              <Input
                name="category-name"
                value={name}
                onChange={onNameChange}
              />
            </FormField>
          </Form>
          <DialogDescription>
            This will add a new category option to all transactions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancelClick} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={onCreateCategory}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
