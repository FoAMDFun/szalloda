import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { Guard } from '../guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerMainComponent,
    canActivate: [Guard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
