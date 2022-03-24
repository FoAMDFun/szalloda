import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpoyeeConfigService {

  constructor() { }
  private readonly _navbuttons: BehaviorSubject<{ id: string; text: string;routerLink:string }[]> =
  new BehaviorSubject<{ id: string; text: string;routerLink:string}[]>([
    { id: "main", text: "Főoldal" ,routerLink:"main"},
    { id: "roommirror", text: "Szobatükör", routerLink:"roommirror"},
    { id: "rooms", text: "Szobák", routerLink:"rooms"},
    { id: "Oldal4", text: "Oldal4", routerLink:""},
    { id: "Oldal5", text: "Oldal5" ,routerLink:""}
  ]);
  public get navbuttons(): Observable<{ id: string; text: string,routerLink:string}[]> {
    return this._navbuttons;
  }
  private readonly _mainButton: BehaviorSubject<{ id: string; text: string;routerLink:string }> =
  new BehaviorSubject<{ id: string; text: string;routerLink:string}>(
    { id: "hotel", text: "Szálloda" ,routerLink:"/employee"},
);
  public get mainButton(): Observable<{ id: string; text: string,routerLink:string}> {
    return this._mainButton;
  }
}
