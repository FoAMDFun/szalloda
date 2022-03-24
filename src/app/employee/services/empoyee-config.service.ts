import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavItem } from 'src/app/models/nav-item';

@Injectable({
  providedIn: 'root'
})
export class EmpoyeeConfigService {

  constructor() { }
  private readonly _navbuttons: BehaviorSubject<NavItem[]> =
  new BehaviorSubject<NavItem[]>([
    { id: "main", text: "Főoldal" ,routerLink:"main"},
    { id: "roommirror", text: "Szobatükör", routerLink:"roommirror"},
    { id: "rooms", text: "Szobák", routerLink:"rooms"},
    { id: "Oldal4", text: "Oldal4", routerLink:""},
    { id: "Oldal5", text: "Oldal5" ,routerLink:""}
  ]);
  public get navbuttons(): Observable<NavItem[]> {
    return this._navbuttons;
  }
  private readonly _mainButton: BehaviorSubject<NavItem> =
  new BehaviorSubject<NavItem>(
    { id: "hotel", text: "Szálloda" ,routerLink:"/employee"},
);
  public get mainButton(): Observable<NavItem> {
    return this._mainButton;
  }
}
