import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomMirrorComponent } from './components/room-mirror/room-mirror.component';
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
      },
      {
        path: 'roommirror',
        component: RoomMirrorComponent
      },
      {
        path: 'rooms',
        component: RoomListComponent
      },
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
export class EmployeeRoutingModule {}
