import { createSelector } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
import { AuthState } from '../reducers/auth.reducer';

export const authLoggedInSelector = createSelector(
  (state: AuthState) => state.loggedIn,
  (loggedIn: boolean) => loggedIn
);

export const authUserSelector = createSelector(
  (state: AuthState) => state.user,
  (user: UserCredential) => user
);

// export const reservationSelectorWithDateFilter = createSelector(
//   (state: ReservationState) => state.reservations.items,
//   (state: ReservationState) => state.reservations.startDate,
//   (state: ReservationState) => state.reservations.endDate,
//   (
//     reservations: ReadonlyArray<Reservation>,
//     startDate: Timestamp,
//     endDate: Timestamp
//   ) =>
//     reservations.filter(
//       (reservation: Reservation) =>
//         reservation.startDate.seconds >= startDate.seconds &&
//         reservation.endDate.seconds <= endDate.seconds
//     )
// );
