import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
// import { traceUntilFirst } from '@angular/fire/performance';
import { State } from '@ngrx/store';
// import { BehaviorSubject, EMPTY, map, Observable, Subscription } from 'rxjs';
import { LoginData } from '../models/login-data';
import { AuthState } from '../store/reducers/auth.reducer';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly userDisposable: Subscription | undefined;
  // public readonly user$: Observable<User | null> = EMPTY;
  // public userLoggedIn = false;
  // private readonly userIDBS$ = new BehaviorSubject('');
  // public readonly userID$ = this.userIDBS$.asObservable();

  constructor(private auth: Auth, private store: State<AuthState>) {
    // if (auth) {
    //   this.user$ = authState(this.auth);
    //   // this.userIDBS$.next();
    //   this.userDisposable = authState(this.auth)
    //     .pipe(
    //       traceUntilFirst('auth'),
    //       map((loggedUser: User) => {
    //         if (loggedUser && loggedUser.email) {
    //           this.currentUser = loggedUser.email;
    //           this.userService
    //             .getUserID(loggedUser.email)
    //             .then((result) => this.userIDBS$.next(result));
    //         } else this.currentUser = 'User';
    //         return !!loggedUser;
    //       })
    //     )
    //     .subscribe((isLoggedIn) => {
    //       this.userLoggedIn = isLoggedIn;
    //     });
    // }
  }

  login({ email, password }: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
