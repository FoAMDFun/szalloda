import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { BehaviorSubject, EMPTY, map, Observable, Subscription } from 'rxjs';
import { LoginData } from '../models/login-data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userDisposable: Subscription | undefined;
  public readonly user$: Observable<User | null> = EMPTY;
  public userLoggedIn = false;
  public currentUser: string | null = '';
  private userIDBS$ = new BehaviorSubject('');
  public userID$ = this.userIDBS$.asObservable();

  constructor(private auth: Auth, private userService: UserService) {
    if (auth) {
      this.user$ = authState(this.auth);
      // this.userIDBS$.next();
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((loggedUser) => {
            if (loggedUser && loggedUser.email) {
              this.currentUser = loggedUser.email;
              this.userService
                .getUserID(loggedUser.email)
                .then((result) => this.userIDBS$.next(result));
            } else this.currentUser = 'User';
            return !!loggedUser;
          })
        )
        .subscribe((isLoggedIn) => {
          this.userLoggedIn = isLoggedIn;
        });
    }
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
