import { AccountHistory, FindAccountHistoryRequest } from '@kaizen/finance';
import {
  loadAccountHistoryAction,
  loadAccountHistoryFailureAction,
  loadAccountHistorySuccessAction
} from './account-history.actions';
import { FindAccountHistoryClient } from '.';
import { AccountHistoryDispatch } from './account-history.store';
import { ApiResponse, DEFAULT_PAGE_SIZE } from '@kaizen/core';

export const loadAccountHistory = () => {
  return async (dispatch: AccountHistoryDispatch) => {
    dispatch(loadAccountHistoryAction());

    const response = await _loadAccountHistory();
    if (response.type === 'FAILURE')
      return dispatch(loadAccountHistoryFailureAction(response.errors));

    return dispatch(loadAccountHistorySuccessAction(response.data));
  };
};

const _loadAccountHistory = async (): Promise<
  ApiResponse<AccountHistory[]>
> => {
  let page = 1;
  const request = {
    page: page,
    pageSize: DEFAULT_PAGE_SIZE,
    startDate: new Date(new Date().getFullYear() - 10, 0, 0).toISOString(),
    endDate: new Date().toISOString()
  } satisfies FindAccountHistoryRequest;
  let response = await FindAccountHistoryClient.find(request);
  if (response.type === 'FAILURE') return response;

  let { hits } = response.data;
  while (hits.length < response.data.total) {
    response = await FindAccountHistoryClient.find({
      ...request,
      page: ++page
    });

    if (response.type === 'FAILURE') return response;
    hits = [...hits, ...response.data.hits];
  }

  return {
    type: 'SUCCESS',
    data: hits
  };
};
