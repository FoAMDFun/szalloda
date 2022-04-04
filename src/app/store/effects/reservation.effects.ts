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
import * as ReservationActions from '../actions/reservation.action';

@Injectable()
export class ReservationEffects {
  getReservations$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReservationActions.getReservations),
      exhaustMap(() =>
        this.reservationCrudService.getReservations().pipe(
          map((reservations: ReadonlyArray<Reservation>) =>
          ReservationActions.getReservationsSuccess( reservations )
          ),
          catchError((error) => {
            this.toaster.error(
              `Hiba történt a foglalások letöltésénél: ${error.message}`
            );
            return of(ReservationActions.getReservationsError(error));
          })
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReservationActions.addReservation),
      concatMap(
        (
          props // addhoz concat-map kell
        ) =>
          this.reservationCrudService.addReservation(props.reservation).pipe(
            map(() => {
              this.toaster.success('Sikeres foglalás!');
              return ReservationActions.addReservationSuccess();
            }),
            catchError((error) => {
              this.toaster.error('Hiba', 'Hiba a foglalások hozzáadásánál');
              return of(ReservationActions.addReservationError(error));
            })
          )
      )
    )
  );

  deleteReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReservationActions.deleteReservation),
      mergeMap(
        (
          { reservation } // Törléshez mergeMap kell
        ) =>
          this.reservationCrudService.deleteReservation(reservation._id).pipe(
            map(() => {
              this.toaster.success('Sikeres törlés!');
              return ReservationActions.deleteReservationSuccess();
            }),
            catchError((error) => {
              this.toaster.error('Hiba', 'Hiba a foglalások törlésénél!');
              return of(ReservationActions.deleteReservationError(error));
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
