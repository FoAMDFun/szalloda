import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpoyeeConfigService } from '../../services/empoyee-config.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.scss']
})
export class EmployeeNavbarComponent implements OnInit {

  public links$ : Observable<{ id: string; text: string,routerLink:string}[]> = this._empoyeeConfigService.navbuttons
  public mainLink$ : Observable<{ id: string; text: string,routerLink:string}> = this._empoyeeConfigService.mainButton

  constructor(private _empoyeeConfigService: EmpoyeeConfigService) { }

  ngOnInit(): void {
  }

}
