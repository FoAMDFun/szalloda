import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

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
  on(AuthActions.setLoggedIn, (state, { loggedIn, mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: loggedIn,
  })),
  on(AuthActions.setUser, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: !!mail,
  })),
  on(AuthActions.noUser, (state) => ({
    ...state,
    userMail: '',
    uid: '',
    error: null,
    loggedIn: false,
  })),
  on(AuthActions.loginSuccess, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: true,
  })),
  on(AuthActions.loginError, (state, error) => ({
    ...state,
    userMail: '',
    uid: '',
    error: error,
    loggedIn: false,
  })),
  on(AuthActions.registerError, (state, error) => ({
    ...state,
    userMail: '',
    uid: '',
    error: error,
    loggedIn: false,
  })),
  on(AuthActions.registerSuccess, (state, { mail, uid }) => ({
    ...state,
    userMail: mail,
    uid,
    error: null,
    loggedIn: true,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    userMail: '',
    uid: '',
    error: null,
    loggedIn: false,
  }))
);
