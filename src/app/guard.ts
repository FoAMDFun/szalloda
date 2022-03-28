import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AppState } from './store/reducers';
import { getAuthLoggedInSelector } from './store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class Guard implements CanActivate {
  public isLoggedIn$ = this.store.pipe(select(getAuthLoggedInSelector));
  private isLoggedIn: boolean = false;
  private initDone: boolean = false;
  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.initDone = true;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isLoggedIn && this.initDone) {
      this.toastr.error(
        'Be kell jelentkeznie, hogy a dolgozói tartalomhoz hozzáférjen!',
        'Bejelentkezési hiba!'
      );
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
