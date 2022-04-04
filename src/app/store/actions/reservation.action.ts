import { createAction } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';

export const GET_RESERVATIONS = '[RESERVATION] Get all';
export const GET_RESERVATIONS_SUCCESS = '[RESERVATION] Get all success';
export const GET_RESERVATIONS_ERROR = '[RESERVATION] Get all error';
export const ADD_RESERVATION = '[RESERVATION] Add';
export const ADD_RESERVATION_CHECKED = '[RESERVATION] Add checked';
export const ADD_RESERVATION_SUCCESS = '[RESERVATION] Add success';
export const ADD_RESERVATION_ERROR = '[RESERVATION] Add error';
export const DELETE_RESERVATION = '[RESERVATION] Delete';
export const DELETE_RESERVATION_SUCCESS = '[RESERVATION] Delete success';
export const DELETE_RESERVATION_ERROR = '[RESERVATION] Delete error';
export const SET_CURRENT_RESERVATION = '[RESERVATION] Set currentReservation';
export const CLEAR_CURRENT_RESERVATION = '[RESERVATION] Clear currentReservation'
export const UPDATE_RESERVATION = '[RESERVATION] Update';
export const UPDATE_RESERVATION_SUCCESS = '[RESERVATION] Update success';
export const UPDATE_RESERVATION_ERROR = '[RESERVATION] Update error';


export const getReservations = createAction(GET_RESERVATIONS);
export const getReservationsSuccess = createAction(
  GET_RESERVATIONS_SUCCESS,
  (reservations: ReadonlyArray<Reservation>) => ({ reservations })
);
export const getReservationsError = createAction(
  GET_RESERVATIONS_ERROR,
  (error: any) => ({ error })
);

export const addReservation = createAction(
  ADD_RESERVATION,
  (reservation: Reservation) => ({ reservation })
);
export const addReservationSuccess = createAction(ADD_RESERVATION_SUCCESS);
export const addReservationError = createAction(
  ADD_RESERVATION_ERROR,
  (error: any) => ({ error })
);

export const deleteReservation = createAction(
  DELETE_RESERVATION,
  (reservation: Reservation) => ({ reservation })
);
export const deleteReservationSuccess = createAction(
  DELETE_RESERVATION_SUCCESS
);
export const deleteReservationError = createAction(
  DELETE_RESERVATION_ERROR,
  (error: any) => ({ error })
);

export const setCurrendReservation = createAction(
  SET_CURRENT_RESERVATION,
  (reservation: Reservation) => ({ reservation })
);
export const clearCurrentReservation = createAction(CLEAR_CURRENT_RESERVATION);

export const updateReservation = createAction(UPDATE_RESERVATION,(reservation: Reservation) => ({ reservation }));
export const updateReservationSuccess = createAction(UPDATE_RESERVATION_SUCCESS,(reservation: Reservation) => ({ reservation }));
export const updateReservationError = createAction(UPDATE_RESERVATION_ERROR,(error: any) => ({ error }))
