// Core
import { Component, OnInit } from '@angular/core';
// NGRX imports
import { Store } from '@ngrx/store';
import { loginCheck } from './store/actions/auth.action';
import { AppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'szalloda';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loginCheck());
  }
}
