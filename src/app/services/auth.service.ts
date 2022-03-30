import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Store } from '@ngrx/store';
import { map, Subscription, tap } from 'rxjs';
import { LoginData } from '../models/login-data';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { setLoggedIn, setUser } from '../store/actions/auth.action';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: Subscription;
  constructor(private auth: Auth, private store: Store<AuthState>) {
    if (auth) {
      this.user = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          tap((loggedUser) => {
            if (loggedUser && loggedUser.email) {
              this.store.dispatch(setUser(loggedUser.email, loggedUser.uid));
            }
            return !!loggedUser;
          }),
          map((loggedUser) => !!loggedUser)
        )
        .subscribe((isLoggedIn) => {
          const user = this.auth.currentUser;
          const userEmail = user?.email;
          const uid = user?.uid;
          this.store.dispatch(
            setLoggedIn(isLoggedIn, userEmail ? userEmail : '', uid ? uid : '')
          );
        });
    }
  }

  loginCheck(): User | null {
    return this.auth.currentUser;
  }

  register({ email, password }: LoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  ngOnDestroy(): void {
    if (this.user) {
      this.user.unsubscribe();
    }
  }
}
