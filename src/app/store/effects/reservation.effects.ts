import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationCrudService } from 'src/app/services/reservation-crud.service';
import * as ReservationActions from '../actions/reservation.action';
import { AppState } from '../reducers';
import * as ReservationSelectors from '../selectors/reservation.selector';

// Determine if 2 dates overlap
function areDatesOverlap(
  start1: Timestamp,
  end1: Timestamp,
  start2: Timestamp,
  end2: Timestamp
): boolean {
  return start1.seconds <= end2.seconds && end1.seconds >= start2.seconds;
}
@Injectable()
export class ReservationEffects {
  getReservations$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReservationActions.getReservations),
      exhaustMap(() =>
        this.reservationCrudService.getReservations().pipe(
          map((reservations: ReadonlyArray<Reservation>) =>
            ReservationActions.getReservationsSuccess(reservations)
          ),
          catchError((error) => {
            this.toaster.error(
              error.message,
              'Hiba történt a foglalások letöltésénél!'
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
      withLatestFrom(
        this.store.select(ReservationSelectors.getReservationsSelector)
      ),
      concatMap(([item, state]) => {
        if (
          state.findIndex(
            (searchItem: Reservation) =>
              areDatesOverlap(
                item.reservation.startDate,
                item.reservation.endDate,
                searchItem.startDate,
                searchItem.endDate
              ) && item.reservation.roomId === searchItem.roomId
          ) !== -1
        ) {
          this.toaster.error(
            'Már van foglalás a kiválasztott időintervallumban az adott szobához!',
            'Sikertelen foglalás!'
          );
          return of(
            ReservationActions.addReservationError({
              message: 'A foglalás már létezik!',
            })
          );
        } else {
          return this.reservationCrudService
            .addReservation(item.reservation)
            .pipe(
              map(() => {
                this.toaster.success(
                  'Az Ön által kiválasztott időintervallumot illetve szobát elmentettük!',
                  'Sikeres foglalás!'
                );
                return ReservationActions.addReservationSuccess();
              }),
              catchError((error) => {
                this.toaster.error(
                  error.message,
                  'A foglalás mentés sikertelen!'
                );
                return of(ReservationActions.addReservationError(error));
              })
            );
        }
      })
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
              this.toaster.error('Hiba a foglalás törlésénél!', 'Hiba');
              return of(ReservationActions.deleteReservationError(error));
            })
          )
      )
    )
  );

  updateReservation$ = createEffect(() =>
    this.action$.pipe(
      ofType(ReservationActions.updateReservation),
      concatMap(({reservation}) =>
        this.reservationCrudService.updateReservation(reservation).pipe(
          map(() => {
            this.toaster.success('Sikeres módosítás!');
            return ReservationActions.updateReservationSuccess(reservation);
          }),
          catchError((error) => {
            this.toaster.error(`A szoba Módosítása sikertelen! hibaüzenet: ${error.message}`);
            return of(ReservationActions.updateReservationError(error));
          })
        )
      )
    )
  );




  constructor(
    private action$: Actions,
    private reservationCrudService: ReservationCrudService,
    private toaster: ToastrService,
    private store: Store<AppState>
  ) {}
}
