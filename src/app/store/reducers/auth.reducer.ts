import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loginSuccess, logout } from '../actions/auth.action';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = { isLoggedIn: false, user: null };

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user: user,
  })),
  on(logout, (state) => ({ ...state, isLoggedIn: false, user: null }))
  // on(getReservationsError, (state, error) => [...state])
  // on(addReservationSuccess, (state) => [...state])
);
