import { ApiResponse, Service } from '@kaizen/core';
import { Institution } from '@kaizen/institution';

export class SyncAccountsService extends Service {
  constructor() {
    super();
  }

  public async sync(): Promise<ApiResponse<Institution[]>> {
    throw new Error('Not implemented');
  }
}
