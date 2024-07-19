import { UpdateEmailRequest } from './update-email.request';

export interface UpdateEmailCommand extends UpdateEmailRequest {
  userId: string;
}
