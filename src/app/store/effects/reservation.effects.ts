import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
} from 'rxjs/operators';
import { Reservation } from 'src/app/models/reservation.model';

import { ReservationCrudService } from 'src/app/services/reservation-crud.service';
import {
  getReservations,
  getReservationsSuccess,
  getReservationsError,
  addReservation,
  addReservationSuccess,
  addReservationError,
  deleteReservation,
  deleteReservationSuccess,
  deleteReservationError,
  getReservationsFilter,
} from '../actions/reservation.action';
import { ReservationFilter } from '../reducers/reservation.reducer';

@Injectable()
export class ReservationEffects {
  getReservations$ = createEffect(() =>
    this.action$.pipe(
      ofType(getReservations),
      exhaustMap(() =>
        this.reservationCrudService.getReservations().pipe(
          map((reservations: ReadonlyArray<Reservation>) =>
            getReservationsSuccess({ reservations })
          ),
          catchError((error) => of(getReservationsError(error)))
        )
      )
    )
  );

  getReservationsFilter$ = createEffect(() =>
    this.action$.pipe(
      ofType(getReservationsFilter),
      exhaustMap((action) =>
        this.reservationCrudService.getReservationsFilter(action.filter).pipe(
          map((reservations: ReadonlyArray<Reservation>) =>
            getReservationsSuccess({ reservations })
          ),
          catchError((error) => of(getReservationsError({ error })))
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(addReservation),
      concatMap(
        (
          { reservation } // addhoz concat-map kell
        ) =>
          this.reservationCrudService.addReservation(reservation).pipe(
            map(() => addReservationSuccess()),
            catchError((error) => of(addReservationError(error)))
          )
      )
    )
  );

  deleteReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteReservation),
      mergeMap(
        (
          { reservation } // Törléshez mergeMap kell
        ) =>
          this.reservationCrudService.deleteReservation(reservation._id).pipe(
            map(() => deleteReservationSuccess()),
            catchError((error) => of(deleteReservationError(error)))
          )
      )
    )
  );

  constructor(
    private action$: Actions,
    private reservationCrudService: ReservationCrudService
  ) {}
}
