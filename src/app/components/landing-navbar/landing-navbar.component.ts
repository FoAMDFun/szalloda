import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AuthActions from 'src/app/store/actions/auth.action';
import * as DomActions from 'src/app/store/actions/dom.action';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';
import * as DomSelectors from 'src/app/store/selectors/dom.selector';
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
  public isScrolled$ = this.store.pipe(
    select(DomSelectors.getScrolledSelector)
  );
  private isScrolledValue: boolean = false;

  constructor(private store: Store<AppState>) {
    this.isScrolledValue = !(window.scrollY == 0);
  }

  ngOnInit(): void {}

  isScrolled(): boolean {
    const currentValue = window.scrollY !== 0;
    if (currentValue !== this.isScrolledValue) {
      this.isScrolledValue = currentValue;
      if (currentValue) {
        this.store.dispatch(DomActions.scrolledDown());
      } else this.store.dispatch(DomActions.scrolledTop());
    }
    return currentValue;
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
