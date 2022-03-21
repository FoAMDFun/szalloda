import { createReducer, on } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservationsStart,
} from '../actions/reservation.action';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  reservations: ReadonlyArray<Reservation>;
}

const initialState: ReadonlyArray<Reservation> = [];

export const reservationReducer = createReducer(
  initialState,
  on(getReservationsStart, (state) => [...mockReservations()]),
  on(addReservation, (state, reservation) => [...state, reservation])
);

function mockReservations(): Reservation[] {
  return [
    {
      comments: 'Teszt',
      customer: 'Józsi',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      comments: 'Teszt2',
      customer: 'Béla',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      comments: 'Teszt3',
      customer: 'Ancsi',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      comments: 'Teszt4',
      customer: 'Leó',
      endDate: new Date(),
      startDate: new Date(),
    },
  ];
}
