import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        component: EmployeeMainComponent
      },
      {
        path: 'main',
        component: EmployeeMainComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
