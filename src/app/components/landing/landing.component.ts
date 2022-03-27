import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { logout } from 'src/app/store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { authLoggedInSelector } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
  }

  public loggedin$ = this.store.pipe(select(authLoggedInSelector))

  public logOut(): void {
    this.store.dispatch(logout());
  }

}
