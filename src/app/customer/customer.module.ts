import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewReservationComponent } from './components/customer-main/new-reservation/new-reservation.component';
// MD-Bootstrap
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [CustomerMainComponent, NewReservationComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaAutosizeModule,
    MdbModalModule,
  ],
})
export class CustomerModule {}
