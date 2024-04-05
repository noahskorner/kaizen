import { Institution } from '@kaizen/finance';
import { InstitutionStore } from './institution.store';
import {
  InstitutionAction,
  LOAD_INSTITUTIONS,
  LOAD_INSTITUTIONS_FAILURE,
  LOAD_INSTITUTIONS_SUCCESS,
  SYNC_INSTITUTIONS,
  SYNC_INSTITUTIONS_FAILURE,
  SYNC_INSTITUTIONS_SUCCESS
} from './institution.actions';

const initialState: InstitutionStore = {
  loading: false,
  institutions: new Array<Institution>()
};

export const institutionReducers = (
  state = initialState,
  action: InstitutionAction
): InstitutionStore => {
  switch (action.type) {
    case LOAD_INSTITUTIONS:
      return {
        loading: true,
        institutions: []
      };
    case LOAD_INSTITUTIONS_SUCCESS:
      return {
        loading: false,
        institutions: action.payload
      };
    case LOAD_INSTITUTIONS_FAILURE:
      return {
        loading: false,
        institutions: []
      };
    case SYNC_INSTITUTIONS:
      return {
        loading: true,
        institutions: state.institutions
      };
    case SYNC_INSTITUTIONS_SUCCESS:
      return {
        loading: false,
        institutions: action.payload
      };
    case SYNC_INSTITUTIONS_FAILURE:
      return {
        loading: false,
        institutions: state.institutions
      };
    default:
      return state;
  }
};
