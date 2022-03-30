import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavItem, NavItemType } from 'src/app/models/nav-item';

@Injectable({
  providedIn: 'root'
})
export class EmpoyeeConfigService {

  constructor() { }
  private readonly _navbuttons: BehaviorSubject<NavItem[]> =
  new BehaviorSubject<NavItem[]>([
    { _id: "main", text: "Főoldal" ,value:"main",type:NavItemType.ROUTERLINK},
    { _id: "roommirror", text: "Szobatükör", value:"roommirror",type:NavItemType.ROUTERLINK},
    { _id: "rooms", text: "Szobák", value:"rooms",type:NavItemType.ROUTERLINK},
  ]);
  public get navbuttons(): Observable<NavItem[]> {
    return this._navbuttons;
  }
  private readonly _mainButton: BehaviorSubject<NavItem> =
  new BehaviorSubject<NavItem>(
    { _id: "hotel", text: "Szálloda" ,value:"/employee", type:NavItemType.ROUTERLINK},
);
  public get mainButton(): Observable<NavItem> {
    return this._mainButton;
  }
}
