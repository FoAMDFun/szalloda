import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [AppComponent, LandingComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    EmployeeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
