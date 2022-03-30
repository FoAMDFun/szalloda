import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerMainComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaAutosizeModule,
  ],
})
export class CustomerModule {}
