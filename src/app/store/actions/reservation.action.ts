import { createAction, props } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';

export const GET_RESERVATIONS = '[RESERVATION] Get all';
export const GET_RESERVATIONS_SUCCESS = '[RESERVATION] Get all success';
export const GET_RESERVATIONS_ERROR = '[RESERVATION] Get all error';
export const CHANGE_RESERVATION_DATE = '[RESERVATION] Change date';
export const ADD_RESERVATION = '[RESERVATION] Add';
export const ADD_RESERVATION_SUCCESS = '[RESERVATION] Add success';
export const ADD_RESERVATION_ERROR = '[RESERVATION] Add error';
export const DELETE_RESERVATION = '[RESERVATION] Delete';
export const DELETE_RESERVATION_SUCCESS = '[RESERVATION] Delete success';
export const DELETE_RESERVATION_ERROR = '[RESERVATION] Delete error';

export const getReservations = createAction(GET_RESERVATIONS);

export const getReservationsSuccess = createAction(
  GET_RESERVATIONS_SUCCESS,
  props<{ reservations: ReadonlyArray<Reservation> }>()
);

export const getReservationsError = createAction(
  GET_RESERVATIONS_ERROR,
  props<{ error: any }>()
);

export const changeReservationDate = createAction(
  CHANGE_RESERVATION_DATE,
  props<{ startDate: Timestamp; endDate: Timestamp }>()
);

export const addReservation = createAction(
  ADD_RESERVATION,
  props<{ reservation: Reservation }>()
);

export const addReservationSuccess = createAction(ADD_RESERVATION_SUCCESS);

export const addReservationError = createAction(
  ADD_RESERVATION_ERROR,
  props<{ reservation: Reservation }>()
);

export const deleteReservation = createAction(
  DELETE_RESERVATION,
  props<{ reservation: Reservation }>()
);

export const deleteReservationSuccess = createAction(
  DELETE_RESERVATION_SUCCESS
);

export const deleteReservationError = createAction(
  DELETE_RESERVATION_ERROR,
  props<{ reservation: Reservation }>()
);
