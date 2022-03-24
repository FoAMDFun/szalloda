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
    { id: "main", text: "Főoldal" ,value:"main",type:NavItemType.ROUTERLINK},
    { id: "roommirror", text: "Szobatükör", value:"roommirror",type:NavItemType.ROUTERLINK},
    { id: "rooms", text: "Szobák", value:"rooms",type:NavItemType.ROUTERLINK},
    { id: "Oldal4", text: "Oldal4", value:"",type:NavItemType.SELECT},
    { id: "Oldal5", text: "Oldal5" ,value:"",type:NavItemType.SELECT}
  ]);
  public get navbuttons(): Observable<NavItem[]> {
    return this._navbuttons;
  }
  private readonly _mainButton: BehaviorSubject<NavItem> =
  new BehaviorSubject<NavItem>(
    { id: "hotel", text: "Szálloda" ,value:"/employee", type:NavItemType.ROUTERLINK},
);
  public get mainButton(): Observable<NavItem> {
    return this._mainButton;
  }
}
