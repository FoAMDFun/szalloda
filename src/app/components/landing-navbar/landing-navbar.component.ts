import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as AuthActions from 'src/app/store/actions/auth.action';
import * as DomActions from 'src/app/store/actions/dom.action';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';
import * as DomSelectors from 'src/app/store/selectors/dom.selector';
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
  public isScrolled$ = this.store.pipe(
    select(DomSelectors.getScrolledSelector)
  );
  private isScrolledValue: boolean = false;

  constructor(
    private store: Store<AppState>,
    private modalService: MdbModalService
  ) {
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
