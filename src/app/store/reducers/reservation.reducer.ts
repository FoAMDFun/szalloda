import { createReducer, on } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import * as ReservationActions from '../actions/reservation.action';
export interface ReservationState {
  items: ReadonlyArray<Reservation>;
  error: any;
  currentReservation: Reservation | null;
  reservationToSave: Reservation | null;
}
const initialState: ReservationState = {
  items: [],
  error: null,
  currentReservation: null,
  reservationToSave: null,
};

export const reservationReducer = createReducer(
  initialState,
  on(ReservationActions.getReservationsSuccess, (state, { reservations }) => ({
    ...state,
    items: [...reservations],
    error: null,
    reservationToSave: null,
  })),
  on(ReservationActions.getReservationsError, (state, error) => ({
    ...state,
    items: [],
    error: error,
    reservationToSave: null,
  })),
  on(ReservationActions.deleteReservation, (state, { reservation }) => ({
    ...state,
    items: state.items.filter(
      (item: Reservation) => item?._id !== reservation._id
    ),
    error: null,
  })),
  on(ReservationActions.setCurrendReservation, (state, { reservation }) => ({
    ...state,
    currentReservation: reservation,
  })),
  on(ReservationActions.clearCurrentReservation, (state) => ({
    ...state,
    currentReservation: null,
  })),
  on(ReservationActions.updateReservationSuccess, (state, { reservation }) => ({
    ...state,
    items: state.items.map((r: Reservation) => r._id === reservation._id ? reservation : r)
  })),
  on(ReservationActions.updateReservationError, (state, { error }) => ({
    ...state,
    error: error
  }))
);
