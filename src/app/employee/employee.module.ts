import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
];

@NgModule({
  declarations: [EmployeeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmployeeModule {}
