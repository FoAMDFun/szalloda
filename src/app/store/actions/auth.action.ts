import { createAction } from '@ngrx/store';
import { User, UserCredential } from 'firebase/auth';
import { LoginData } from 'src/app/models/login-data';

export const SET_USER = '[Auth] Set User';
export const NO_USER = '[Auth] No User';
export const LOGIN_CHECK = '[Auth] Login Check';
export const SET_LOGGED_IN = '[Auth] Set Logged In';
export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login success';
export const LOGIN_ERROR = '[AUTH] Login error';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register success';
export const REGISTER_ERROR = '[AUTH] Register error';
export const LOGOUT = '[AUTH] Logout';
export const LOGOUT_ERROR = '[AUTH] Logout error';
export const LOGOUT_SUCCESS = '[AUTH] Logout success';

export const setUser = createAction(SET_USER, (mail: string, uid: string) => ({
  mail,
  uid,
}));
export const noUser = createAction(NO_USER);
export const loginCheck = createAction(LOGIN_CHECK);
export const setLoggedIn = createAction(
  SET_LOGGED_IN,
  (loggedIn: boolean, mail: string, uid: string) => ({
    loggedIn,
    mail,
    uid,
  })
);
export const login = createAction(LOGIN, (user: LoginData) => ({ user }));
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (mail: string, uid: string) => ({
    mail,
    uid,
  })
);
export const loginError = createAction(LOGIN_ERROR, (error: any) => ({
  error,
}));
export const register = createAction(REGISTER, (user: LoginData) => ({ user }));
export const registerSuccess = createAction(
  REGISTER_SUCCESS,
  (mail: string, uid: string) => ({
    mail,
    uid,
  })
);
export const registerError = createAction(REGISTER_ERROR, (error: any) => ({
  error,
}));
export const logout = createAction(LOGOUT);
export const logoutError = createAction(LOGOUT_ERROR, (error: any) => ({
  error,
}));
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
