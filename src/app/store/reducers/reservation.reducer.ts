import { createReducer, on } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  changeReservationDate,
  clearCurrentReservation,
  deleteReservation,
  getReservationsError,
  getReservationsSuccess,
  setCurrendReservation,
} from '../actions/reservation.action';
export interface ReservationState {
  items: ReadonlyArray<Reservation>;
  error: any;
  startDate: Timestamp;
  endDate: Timestamp;
  currentReservation: Reservation | null;
}
const initialState: ReservationState = {
  items: [],
  error: null,
  startDate: Timestamp.fromDate(new Date('2022-01-01T00:00:00')),
  endDate: Timestamp.fromDate(new Date('2999-12-31T23:23:23')),
  currentReservation: null,
};

export const reservationReducer = createReducer(
  initialState,
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
    items: state.items.filter(
      (item: Reservation) => item?._id !== reservation._id
    ),
    error: null,
  })),
  on(setCurrendReservation, (state, { reservation }) => ({
    ...state,
    currentReservation: reservation,
  })),
  on(clearCurrentReservation, (state) => ({
    ...state,
    currentReservation: null,
  }))
);
