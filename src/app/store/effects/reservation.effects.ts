import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
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
} from '../actions/reservation.action';

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
          catchError((error) => {
            this.toaster.error(
              `Hiba történt a foglalások letöltésénél: ${error.message}`
            );
            return of(getReservationsError(error));
          })
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(addReservation),
      concatMap(
        (
          props // addhoz concat-map kell
        ) =>
          this.reservationCrudService.addReservation(props.reservation).pipe(
            map(() => {
              this.toaster.success('Sikeres foglalás!');
              return addReservationSuccess();
            }),
            catchError((error) => {
              this.toaster.error('Hiba', 'Hiba a foglalások hozzáadásánál');
              return of(addReservationError(error));
            })
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
            map(() => {
              this.toaster.success('Sikeres törlés!');
              return deleteReservationSuccess();
            }),
            catchError((error) => {
              this.toaster.error('Hiba', 'Hiba a foglalások törlésénél!');
              return of(deleteReservationError(error));
            })
          )
      )
    )
  );

  constructor(
    private action$: Actions,
    private reservationCrudService: ReservationCrudService,
    private toaster: ToastrService
  ) {}
}
