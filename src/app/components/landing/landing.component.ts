import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { logout } from 'src/app/store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { getAuthLoggedInSelector } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(select(getAuthLoggedInSelector));

  constructor(
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async logOut(): Promise<void> {
    console.log(this.authService.loginCheck());
    this.store.dispatch(logout());
    this.authService
      .logout()
      .then(() => {
        console.log(`Logged in user: ${this.authService.loginCheck()}`);
      })
      .catch((err) => {
        console.log('Landing Component authService.logout()', err);
      });
  }
}
