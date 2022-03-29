import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, EmptyError, from, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { User, UserCredential } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import {
  login,
  loginCheck,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  noUser,
  register,
  registerError,
  registerSuccess,
  setUser,
} from '../actions/auth.action';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap((props) =>
        defer(() =>
          from(this.authService.login(props.user)).pipe(
            map((user: UserCredential) => {
              this.toastr.success('Sikeres bejelentkezés');
              return loginSuccess(user.user.email as string);
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Bejelentkezés sikertelen!');
              console.error(error);
              return of(loginError({ ...error }));
            })
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() =>
        defer(() =>
          from(this.authService.logout()).pipe(
            map(() => {
              this.toastr.success('Sikeres kijelentkezés');
              return logoutSuccess();
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Kijelentkezés sikertelen!');
              return of(logoutError({ ...error }));
            })
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(register),
      exhaustMap((props) =>
        defer(() =>
          from(this.authService.register(props.user)).pipe(
            map((user: UserCredential) => {
              this.toastr.success('Sikeres regisztráció');
              return registerSuccess(user.user.email as string);
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Regisztráció sikertelen!');
              return of(registerError({ ...error }));
            })
          )
        )
      )
    )
  );

  loginCheck$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginCheck),
      exhaustMap(() =>
        defer(() =>
          of(this.authService.loginCheck()).pipe(
            map(
              (user) => {
                return user && user.email ? setUser(user.email) : noUser();
              },
              catchError(() => of(EmptyError))
            )
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerSuccess, loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
