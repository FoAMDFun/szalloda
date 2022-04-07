import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AuthActions from 'src/app/store/actions/auth.action';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';
import { LoginComponent } from '../login/login.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss'],
})
export class LandingNavbarComponent implements OnInit {
  loginModalRef: MdbModalRef<LoginComponent> | null = null;
  registerModalRef: MdbModalRef<RegisterComponent> | null = null;
  public isLoggedIn$ = this.store.pipe(
    select(AuthSelectors.getAuthLoggedInSelector)
  );

  constructor(
    private store: Store<AppState>,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {}

  isScrolled(): boolean {
    return window.scrollY !== 0;
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

  openLogin(): void {
    this.loginModalRef = this.modalService.open(LoginComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  openRegister(): void {
    this.registerModalRef = this.modalService.open(RegisterComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }
}
