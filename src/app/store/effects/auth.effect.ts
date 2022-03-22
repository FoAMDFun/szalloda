import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffects {
  // login$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(login),
  //     exhaustMap(() =>
  //       this.authService.login().pipe(
  //         map((reservations: ReadonlyArray<Reservation>) =>
  //           getReservationsSuccess(reservations)
  //         ),
  //         catchError((error) => of(getReservationsError(error)))
  //       )
  //     )
  //   )
  // );

  // logout$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(login),
  //     exhaustMap(() =>
  //       this.authService.login().pipe(
  //         map((reservations: ReadonlyArray<Reservation>) =>
  //           getReservationsSuccess(reservations)
  //         ),
  //         catchError((error) => of(getReservationsError(error)))
  //       )
  //     )
  //   )
  // );

  constructor(private action$: Actions, private authService: AuthService) {}
}
