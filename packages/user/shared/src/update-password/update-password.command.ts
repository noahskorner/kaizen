import { UpdatePasswordRequest } from './update-password.request';

export interface UpdatePasswordCommand extends UpdatePasswordRequest {
  userId: string;
}
