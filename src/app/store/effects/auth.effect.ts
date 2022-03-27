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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap((props) =>
        from(this.authService.login(props.user)).pipe(
          map((user: UserCredential) => {
            this.toastr.success('Sikeres bejelentkezés');
            return loginSuccess(user);
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Bejelentkezés sikertelen!');
            return of(loginError(error));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() =>
        from(this.authService.logout()).pipe(
          map(() => {
            this.toastr.success('Sikeres kijelentkezés');
            return logoutSuccess();
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Kijelentkezés sikertelen!');
            return of(logoutError(error));
          })
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
          map((user: UserCredential) => {
            this.toastr.success('Sikeres regisztráció');
            return registerSuccess(user);
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Regisztráció sikertelen!');
            return of(registerError(error));
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
}
