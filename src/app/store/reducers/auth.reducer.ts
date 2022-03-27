import { createReducer, on } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from '../actions/auth.action';

export interface AuthState {
  loggedIn: boolean;
  user: UserCredential;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  user: {} as UserCredential,
  loading: false,
  error: null,
  success: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { userCredential }) => ({
    ...state,
    user: userCredential,
    loggedIn: true,
    loading: false,
    error: null,
    success: true,
  })),
  on(registerSuccess, (state, { userCredential }) => ({
    ...state,
    user: userCredential,
    loggedIn: true,
    loading: false,
    error: null,
    success: true,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: {} as UserCredential,
    error: null,
    loading: false,
    success: true,
  }))
);
