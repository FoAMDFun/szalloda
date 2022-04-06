import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const getAuthUserUidSelector = createSelector(
  getAuthState,
  (state: AuthState) => state.uid
);
