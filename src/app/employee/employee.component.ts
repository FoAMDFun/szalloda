import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItem } from '../models/nav-item';
import { EmpoyeeConfigService } from './services/empoyee-config.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public links$ : Observable<NavItem[]> = this._empoyeeConfigService.navbuttons
  public mainLink$ : Observable<NavItem> = this._empoyeeConfigService.mainButton

  constructor(private _empoyeeConfigService: EmpoyeeConfigService) { }

  ngOnInit(): void {
  }

}
