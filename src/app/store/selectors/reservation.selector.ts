import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { ReservationState } from '../reducers/reservation.reducer';

export const reservationFilterStartDate = (state: AppState) =>
  state.reservation.startDate.toDate;
export const reservationFilterEndDate = (state: AppState) =>
  state.reservation.endDate.toDate;

export const getReservationState =
  createFeatureSelector<ReservationState>('reservation');

export const getReservationsSelector = createSelector(
  getReservationState,
  (state: ReservationState) => state.items
);

export const getReservationWithFilterSelector = createSelector(
  getReservationState,
  (state) =>
    state.items.filter(
      (reservation) =>
        reservation.startDate.seconds >= state.startDate.seconds &&
        reservation.endDate.seconds <= state.endDate.seconds
    )
);

export const isReservationFilterEmpty = createSelector(
  getReservationState,
  getReservationWithFilterSelector,
  (state, reservations) => reservations.length === 0
);
