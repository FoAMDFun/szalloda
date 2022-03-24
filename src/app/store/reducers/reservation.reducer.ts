import { createReducer, on } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  changeReservationDate,
  deleteReservation,
  getReservationsError,
  getReservationsSuccess,
} from '../actions/reservation.action';
export interface ReservationState {
  reservations: {
    items: ReadonlyArray<Reservation>;
    error: any;
    startDate: Timestamp;
    endDate: Timestamp;
  };
}
const initialState: ReservationState = {
  reservations: {
    items: [],
    error: null,
    startDate: Timestamp.fromDate(new Date('2022-01-01T00:00:00')),
    endDate: Timestamp.fromDate(new Date('2999-12-31T23:23:23')),
  },
};

export const reservationReducer = createReducer(
  initialState.reservations,
  on(getReservationsSuccess, (state, { reservations }) => ({
    ...state,
    items: [...reservations],
    error: null,
  })),
  on(changeReservationDate, (state, { startDate, endDate }) => ({
    ...state,
    startDate: startDate,
    endDate: endDate,
    error: null,
  })),
  on(getReservationsError, (state, error) => ({
    ...state,
    items: [],
    error: error,
  })),
  on(deleteReservation, (state, { reservation }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== reservation._id),
    error: null,
  }))
);
