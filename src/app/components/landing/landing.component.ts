import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.store.dispatch(logout());
  }

}
