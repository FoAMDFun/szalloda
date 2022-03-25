import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItem, NavItemType } from 'src/app/models/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() public links$ ?: Observable<NavItem[]>
  @Input() public mainLink$ ?: Observable<NavItem>

  public readonly routerLinkType = NavItemType.ROUTERLINK

  constructor() { }

  ngOnInit(): void {
  }


}
