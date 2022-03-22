import { createAction } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login success';
export const LOGIN_ERROR = '[AUTH] Login error';
export const LOGOUT = '[AUTH] Logout';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register success';
export const REGISTER_ERROR = '[AUTH] Register error';

export const login = createAction(LOGIN, (user: User) => ({ user }));
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR, (error: any) => ({
  error,
}));
export const logout = createAction(LOGOUT);
export const register = createAction(REGISTER, (user: User) => ({ user }));
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerError = createAction(REGISTER_ERROR, (error: any) => ({
  error,
}));
