import { ApiResponse } from '@kaizen/core';
import { CreateLinkTokenCommand } from './create-link-token.command';
import { LinkToken } from '../link-token';

export interface ICreateLinkTokenService {
  create(command: CreateLinkTokenCommand): Promise<ApiResponse<LinkToken>>;
}
