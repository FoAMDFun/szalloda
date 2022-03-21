import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerMainComponent,
  },
];
@NgModule({
  declarations: [CustomerMainComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomerModule {}
