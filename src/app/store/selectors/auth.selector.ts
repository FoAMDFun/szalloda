import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User, UserCredential } from 'firebase/auth';
import { AuthState } from '../reducers/auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthLoggedInSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.loggedIn
);

export const getAuthUserMailSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.userMail
);
