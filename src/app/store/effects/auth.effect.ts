import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, EmptyError, from, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthAction from '../actions/auth.action';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.login),
      exhaustMap((props) =>
        defer(() =>
          from(this.authService.login(props.user)).pipe(
            map((user: UserCredential) => {
              this.toastr.success('Sikeres bejelentkezés');
              return AuthAction.loginSuccess(
                user.user.email as string,
                user.user.uid as string
              );
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Bejelentkezés sikertelen!');
              console.error(error);
              return of(AuthAction.loginError({ ...error }));
            })
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.logout),
      exhaustMap(() =>
        defer(() =>
          from(this.authService.logout()).pipe(
            map(() => {
              this.toastr.success('Sikeres kijelentkezés');
              return AuthAction.logoutSuccess();
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Kijelentkezés sikertelen!');
              return of(AuthAction.logoutError({ ...error }));
            })
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.register),
      exhaustMap((props) =>
        defer(() =>
          from(this.authService.register(props.user)).pipe(
            map((user: UserCredential) => {
              this.toastr.success('Sikeres regisztráció');
              return AuthAction.registerSuccess(
                user.user.email as string,
                user.user.uid as string
              );
            }),
            catchError((error) => {
              this.toastr.error(error.message, 'Regisztráció sikertelen!');
              return of(AuthAction.registerError({ ...error }));
            })
          )
        )
      )
    )
  );

  loginCheck$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.loginCheck),
      exhaustMap(() =>
        defer(() =>
          of(this.authService.loginCheck()).pipe(
            map(
              (user) => {
                return user && user.email
                  ? AuthAction.setUser(user.email, user.uid)
                  : AuthAction.noUser();
              },
              catchError(() => of(EmptyError))
            )
          )
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthAction.registerSuccess, AuthAction.loginSuccess),
        tap(() => {
          localStorage.setItem('user', 'true');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logoutSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthAction.logoutSuccess),
        tap(() => {
          localStorage.setItem('user', 'false');
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
