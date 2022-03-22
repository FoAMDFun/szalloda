import { createReducer, on } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservationSuccess,
  getReservationsError,
  getReservationsSuccess,
} from '../actions/reservation.action';

export interface ReservationState {
  reservations: ReadonlyArray<Reservation>;
}

const initialState: ReadonlyArray<Reservation> = [];

export const reservationReducer = createReducer(
  initialState,
  on(getReservationsSuccess, (state, { reservation }) => [...reservation]),
  on(getReservationsError, (state, error) => [...state])
  // on(addReservationSuccess, (state) => [...state])
);
