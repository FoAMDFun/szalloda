import { createReducer, on } from '@ngrx/store';
import {
  loginError,
  loginSuccess,
  logoutSuccess,
  noUser,
  registerError,
  registerSuccess,
  setLoggedIn,
  setUser,
} from '../actions/auth.action';

export interface AuthState {
  loggedIn: boolean;
  userMail: string;
  error: any;
}

const initialState: AuthState = {
  loggedIn: false,
  userMail: '',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(setLoggedIn, (state, { loggedIn, mail }) => ({
    ...state,
    userMail: mail,
    error: null,
    loggedIn: loggedIn,
  })),
  on(setUser, (state, { mail }) => ({
    ...state,
    userMail: mail,
    error: null,
    loggedIn: !!mail,
  })),
  on(noUser, (state) => ({
    ...state,
    userMail: '',
    error: null,
    loggedIn: false,
  })),
  on(loginSuccess, (state, { mail }) => ({
    ...state,
    userMail: mail,
    error: null,
    loggedIn: true,
  })),
  on(loginError, (state, error) => ({
    ...state,
    userMail: '',
    error: error,
    loggedIn: false,
  })),
  on(registerError, (state, error) => ({
    ...state,
    userMail: '',
    error: error,
    loggedIn: false,
  })),
  on(registerSuccess, (state, { mail }) => ({
    ...state,
    userMail: mail,
    error: null,
    loggedIn: true,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    userMail: '',
    error: null,
    loggedIn: false,
  }))
);
