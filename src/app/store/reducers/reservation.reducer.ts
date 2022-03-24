import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import {
  deleteReservation,
  getReservationsError,
  getReservationsFilterSuccess,
  getReservationsSuccess,
} from '../actions/reservation.action';

export interface ReservationFilter {
  startDate: Date;
  endDate: Date;
}
export interface ReservationState {
  reservations: {
    items: ReadonlyArray<Reservation>;
    error: any;
  };
  filter: ReservationFilter;
}
const initialState: ReservationState = {
  reservations: {
    items: [],
    error: null,
  },
  filter: {
    startDate: new Date(),
    endDate: new Date('2999-12-31'),
  },
};

export const reservationReducer = createReducer(
  initialState.reservations,
  on(getReservationsSuccess, (state, { reservations }) => ({
    ...state,
    items: [...reservations],
  })),
  on(getReservationsFilterSuccess, (state, { reservations, filter }) => ({
    ...state,
    items: [...reservations],
    filter: { ...filter },
  })),
  on(getReservationsError, (state, error) => ({
    ...state,
    error: error,
  })),
  on(deleteReservation, (state, { reservation }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== reservation._id),
  }))
  // on(addReservationSuccess, (state) => [...state])
);
