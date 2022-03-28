import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { AppState } from 'src/app/store/reducers';
import { getAuthLoggedInSelector } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(select(getAuthLoggedInSelector));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  public logOut(): void {
    this.store.dispatch(logout());
  }
}
