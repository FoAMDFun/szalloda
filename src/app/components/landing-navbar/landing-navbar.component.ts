import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AuthActions from 'src/app/store/actions/auth.action';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss'],
})
export class LandingNavbarComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.getAuthLoggedInSelector)
  );
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  isScrolled(): boolean {
    return !(window.scrollY == 0);
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
