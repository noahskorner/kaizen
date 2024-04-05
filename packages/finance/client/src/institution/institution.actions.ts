import { ApiError } from '@kaizen/core';
import { Institution, SyncInstitutionsResponse } from '@kaizen/finance';

export const LOAD_INSTITUTIONS = 'LOAD_INSTITUTIONS';
export interface LoadInstitutionsAction {
  type: typeof LOAD_INSTITUTIONS;
}
export const loadInstitutionsAction = (): LoadInstitutionsAction => {
  return {
    type: LOAD_INSTITUTIONS
  };
};

export const LOAD_INSTITUTIONS_SUCCESS = 'LOAD_INSTITUTIONS_SUCCESS';
export interface LoadInstitutionsSuccessAction {
  type: typeof LOAD_INSTITUTIONS_SUCCESS;
  payload: Institution[];
}
export const loadInstitutionsSuccessAction = (
  institutions: Institution[]
): LoadInstitutionsSuccessAction => {
  return {
    type: LOAD_INSTITUTIONS_SUCCESS,
    payload: institutions
  };
};

export const LOAD_INSTITUTIONS_FAILURE = 'LOAD_INSTITUTIONS_Failure';
export interface LoadInstitutionsFailureAction {
  type: typeof LOAD_INSTITUTIONS_FAILURE;
  payload: ApiError[];
}
export const loadInstitutionsFailureAction = (
  errors: ApiError[]
): LoadInstitutionsFailureAction => {
  return {
    type: LOAD_INSTITUTIONS_FAILURE,
    payload: errors
  };
};

export const SYNC_INSTITUTIONS = 'SYNC_INSTITUTIONS';
export interface SyncInstitutionsAction {
  type: typeof SYNC_INSTITUTIONS;
}
export const syncInstitutionsAction = (): SyncInstitutionsAction => {
  return {
    type: SYNC_INSTITUTIONS
  };
};

export const SYNC_INSTITUTIONS_SUCCESS = 'SYNC_INSTITUTIONS_SUCCESS';
export interface SyncInstitutionsSuccessAction {
  type: typeof SYNC_INSTITUTIONS_SUCCESS;
  payload: Institution[];
}
export const syncInstitutionsSuccessAction = (
  response: SyncInstitutionsResponse
): SyncInstitutionsSuccessAction => {
  return {
    type: SYNC_INSTITUTIONS_SUCCESS,
    payload: response.succeeded
  };
};

export const SYNC_INSTITUTIONS_FAILURE = 'SYNC_INSTITUTIONS_FAILURE';
export interface SyncInstitutionsFailureAction {
  type: typeof SYNC_INSTITUTIONS_FAILURE;
  payload: ApiError[];
}
export const syncInstitutionsFailureAction = (
  errors: ApiError[]
): SyncInstitutionsFailureAction => {
  return {
    type: SYNC_INSTITUTIONS_FAILURE,
    payload: errors
  };
};

export type InstitutionAction =
  | LoadInstitutionsAction
  | LoadInstitutionsSuccessAction
  | LoadInstitutionsFailureAction
  | SyncInstitutionsAction
  | SyncInstitutionsSuccessAction
  | SyncInstitutionsFailureAction;
