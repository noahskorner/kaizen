import { Institution } from '@kaizen/finance';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { InstitutionAction } from './institution.actions';

export interface InstitutionStore {
  loading: boolean;
  institutions: Institution[];
}

export type InstitutionState = {
  institution: InstitutionStore;
};

export type InstitutionDispatch = ThunkDispatch<
  InstitutionState,
  unknown,
  InstitutionAction
>;
