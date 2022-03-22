import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
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
} from '../actions/reservation.action';

@Injectable()
export class ReservationEffects {
  getReservations$ = createEffect(() =>
    this.action$.pipe(
      ofType(getReservations),
      exhaustMap(() =>
        this.reservationCrudService.getReservations().pipe(
          map((reservations: ReadonlyArray<Reservation>) =>
            getReservationsSuccess(reservations)
          ),
          catchError((error) => of(getReservationsError(error)))
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(addReservation),
      concatMap(({ reservation }) =>
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
      concatMap(({ reservation }) =>
        this.reservationCrudService.deleteReservation(reservation).pipe(
          map(() => deleteReservationSuccess()),
          catchError((error) => of(deleteReservationError(error)))
        )
      )
    )
  )


  constructor(
    private action$: Actions,
    private reservationCrudService: ReservationCrudService
  ) {}
}
