import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeMainComponent,
    EmployeeNavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ],
})
export class EmployeeModule {}
