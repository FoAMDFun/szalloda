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
  uid: string;
  error: any;
}

const initialState: AuthState = {
  loggedIn: false,
  userMail: '',
  uid: '',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(setLoggedIn, (state, { loggedIn, mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: loggedIn,
  })),
  on(setUser, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: !!mail,
  })),
  on(noUser, (state) => ({
    ...state,
    userMail: '',
    uid: '',
    error: null,
    loggedIn: false,
  })),
  on(loginSuccess, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: true,
  })),
  on(loginError, (state, error) => ({
    ...state,
    userMail: '',
    uid: '',
    error: error,
    loggedIn: false,
  })),
  on(registerError, (state, error) => ({
    ...state,
    userMail: '',
    uid: '',
    error: error,
    loggedIn: false,
  })),
  on(registerSuccess, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: true,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    userMail: '',
    uid: '',
    error: null,
    loggedIn: false,
  }))
);
