// Core
import { Component, OnInit } from '@angular/core';
// NGRX imports
import { Store } from '@ngrx/store';
import { loginCheck } from './store/actions/auth.action';
import { AuthState } from './store/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'szalloda';

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(loginCheck());
  }
}
