import { ApiResponse } from '@kaizen/core';
import { LinkToken } from '@kaizen/user';
import { CreateLinkTokenCommand } from './create-link-token.command';

export interface ICreateLinkTokenService {
  create(command: CreateLinkTokenCommand): Promise<ApiResponse<LinkToken>>;
}
