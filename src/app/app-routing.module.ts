import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // A kezdőlap;
  { path: 'login', component: LoginComponent }, // Bejelentkezés
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'worker',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  { path: '**', component: PageNotFoundComponent },
]; // hogy ne fusson üres oldalra sehol visszaugrunk a Page not found-ra

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
