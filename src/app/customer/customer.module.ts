import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerMainComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
],
})
export class CustomerModule {}
