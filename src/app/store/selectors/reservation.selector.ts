import { createSelector } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationState } from '../reducers/reservation.reducer';

export const reservationFilterStartDate = (state: ReservationState) =>
  state.reservations.startDate.toDate;
export const reservationFilterEndDate = (state: ReservationState) =>
  state.reservations.endDate.toDate;

export const reservationSelector = createSelector(
  (state: ReservationState) => state.reservations.items,
  (reservations: ReadonlyArray<Reservation>) => reservations
);

export const reservationSelectorWithDateFilter = createSelector(
  (state: ReservationState) => state.reservations.items,
  (state: ReservationState) => state.reservations.startDate,
  (state: ReservationState) => state.reservations.endDate,
  (
    reservations: ReadonlyArray<Reservation>,
    startDate: Timestamp,
    endDate: Timestamp
  ) =>
    reservations.filter(
      (reservation: Reservation) =>
        reservation.startDate.seconds >= startDate.seconds &&
        reservation.endDate.seconds <= endDate.seconds
    )
);

