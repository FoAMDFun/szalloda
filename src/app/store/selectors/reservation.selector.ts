import { createSelector } from "@ngrx/store";
import { Reservation } from "src/app/models/reservation.model";
import { ReservationState } from '../reducers/reservation.reducer'

export const reservationSelector = createSelector(
  (state: ReservationState) => state.reservations.items,
  (reservations: ReadonlyArray<Reservation>) => reservations
);
