import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess,
} from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap((props) =>
        from(this.authService.login(props.user)).pipe(
          map((user: UserCredential) => loginSuccess(user)),
          catchError((error) => of(loginError(error)))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() =>
        from(this.authService.logout()).pipe(
          map(() => logoutSuccess()),
          catchError((error) => of(logoutError(error)))
        )
      )
    )
  );

  // register effect createEffect with authService.register
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(register),
      exhaustMap((props) =>
        from(this.authService.register(props.user)).pipe(
          map((user: UserCredential) => registerSuccess(user)),
          catchError((error) => of(registerError(error)))
        )
      )
    )
  );

  constructor(private action$: Actions, private authService: AuthService) {}
}
