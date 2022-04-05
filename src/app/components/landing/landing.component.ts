import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.getAuthLoggedInSelector)
  );
  public currentUser$ = this.store.pipe(
    select(AuthSelectors.getAuthUserMailSelector)
  );
  public currentUserUid$ = this.store.pipe(
    select(AuthSelectors.getAuthUserUidSelector)
  );

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {}
}
