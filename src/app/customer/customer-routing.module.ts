import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerComponent } from './customer.component';
import { RoomReservationComponent } from './components/room-reservation/room-reservation.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'main',
        component: CustomerMainComponent
      },
      {
        path: '',
        component: RoomReservationComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
