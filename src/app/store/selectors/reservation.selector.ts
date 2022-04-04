import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationStatus } from 'src/app/models/reservation.model';
import { ReservationState } from '../reducers/reservation.reducer';

export const getReservationState =
  createFeatureSelector<ReservationState>('reservation');

export const getReservationsSelector = createSelector(
  getReservationState,
  (state: ReservationState) => state.items
);

export const getUnconfirmedReservation = createSelector(
  getReservationState,
  (state:ReservationState) =>
  // state.items
  state.items.filter(reservation => reservation.status === ReservationStatus.UNCONFIRMED))

export const getCurrentReservation = createSelector(
  getReservationState,
  (state:ReservationState) => state.currentReservation
)

export const getReservationToSave = createSelector(
  getReservationState,
  (state:ReservationState) => state.reservationToSave
)
