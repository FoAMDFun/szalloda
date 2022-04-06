import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AOS from 'aos';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';
import * as DomSelectors from 'src/app/store/selectors/dom.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public images: string[] = [];
  public isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.getAuthLoggedInSelector)
  );
  public currentUser$ = this.store.pipe(
    select(AuthSelectors.getAuthUserMailSelector)
  );
  public currentUserUid$ = this.store.pipe(
    select(AuthSelectors.getAuthUserUidSelector)
  );
  public isScrolled$ = this.store.pipe(
    select(DomSelectors.getScrolledSelector)
  );

  constructor(private store: Store<AppState>) {
    AOS.init();
    for (let i = 1; i < 10; i++) this.images.push(`../../../assets/0${i}.jpg`);
  }

  ngOnInit(): void {}
}
