import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // A kezdőlap;
  { path: '**', component: PageNotFoundComponent },
]; // hogy ne fusson üres oldalra sehol visszaugrunk a Page not found-ra

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
