import { InstitutionClient } from '../institution.client';
import { InstitutionDispatch } from './institution.store';
import {
  loadInstitutionsAction,
  loadInstitutionsFailureAction,
  loadInstitutionsSuccessAction,
  syncInstitutionsAction,
  syncInstitutionsFailureAction,
  syncInstitutionsSuccessAction
} from './institution.actions';

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

    const response = await InstitutionClient.find();
    if (response.type === 'FAILURE')
      return dispatch(syncInstitutionsFailureAction(response.errors));

    return dispatch(syncInstitutionsSuccessAction(response.data));
  };
};
