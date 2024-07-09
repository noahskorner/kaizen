import { UpdateUserEmailRequest } from './update-user-email.request';

export interface UpdateUserEmailCommand extends UpdateUserEmailRequest {
  userId: string;
}
