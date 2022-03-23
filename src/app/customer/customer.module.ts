import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { RoomReservationComponent } from './components/room-reservation/room-reservation.component';


@NgModule({
  declarations: [CustomerMainComponent, CustomerComponent, RoomReservationComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
],
})
export class CustomerModule {}
