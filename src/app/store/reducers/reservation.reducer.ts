import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservationSuccess,
  deleteReservation,
  getReservationsError,
  getReservationsSuccess,
} from '../actions/reservation.action';

export interface ReservationState {
  reservations:{
    items:ReadonlyArray<Reservation>,
    error:any
  }
}
const initialState: ReservationState = {
  reservations:{
    items:[],
    error:null
  },
}

export const reservationReducer = createReducer(
  initialState.reservations,
  on(getReservationsSuccess, (state, { reservations }) => ({
    ...state,
    items: [...reservations]
  })),
  on(getReservationsError, (state, error) => ({
    ...state,
    error: error
  })),
  on (deleteReservation,(state, {reservation}) => ({
    ...state,
    items:state.items.filter(item => item._id !== reservation._id)
  }))
  // on(addReservationSuccess, (state) => [...state])
);
