import { createAction, props } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';

export const GET_RESERVATIONS_START = '[RESERVATION] Get start';
export const ADD_RESERVATION = '[RESERVATION] Add';
export const ADD_RESERVATION_SUCCESS = '[RESERVATION] Add success';

export const getReservationsStart = createAction(GET_RESERVATIONS_START);
export const addReservation = createAction(
  ADD_RESERVATION,
  (reservation: Reservation) => reservation
  // props<{ reservation: Reservation }>()
);
export const addReservationSuccess = createAction(
  ADD_RESERVATION_SUCCESS,
  props<{ reservation: Reservation }>()
);
