import { InstitutionClient } from './institution.client';
import { InstitutionDispatch } from './institution.store';
import {
  createInstitutionFailureAction,
  createInstitutionSuccessAction,
  loadInstitutionsAction,
  loadInstitutionsFailureAction,
  loadInstitutionsSuccessAction,
  syncInstitutionsAction,
  syncInstitutionsFailureAction,
  syncInstitutionsSuccessAction
} from './institution.actions';
import { CreateInstitutionRequest } from '@kaizen/finance';

export const loadInstitutions = () => {
  return async (dispatch: InstitutionDispatch) => {
    dispatch(loadInstitutionsAction());

    const response = await InstitutionClient.find();
    if (response.type === 'FAILURE')
      return dispatch(loadInstitutionsFailureAction(response.errors));

    return dispatch(loadInstitutionsSuccessAction(response.data));
  };
};

export const syncInstitutions = () => {
  return async (dispatch: InstitutionDispatch) => {
    dispatch(syncInstitutionsAction());

    const response = await InstitutionClient.sync();
    if (response.type === 'FAILURE')
      return dispatch(syncInstitutionsFailureAction(response.errors));

    return dispatch(syncInstitutionsSuccessAction(response.data));
  };
};

export const createInstitution = (request: CreateInstitutionRequest) => {
  return async (dispatch: InstitutionDispatch) => {
    const response = await InstitutionClient.create(request);
    if (response.type === 'FAILURE')
      return dispatch(createInstitutionFailureAction(response.errors));

    return dispatch(createInstitutionSuccessAction(response.data));
  };
};
