// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Firestore
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import {
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS,
} from 'ng-recaptcha';
// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
// Reducers
import { reservationReducer } from './store/reducers/reservation.reducer';
import { roomReducer } from './store/reducers/room.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { customerReducer } from './store/reducers/customer.reducer';
import { messageReducer } from './store/reducers/message.reducer';
// Effects
import { ReservationEffects } from './store/effects/reservation.effects';
import { RoomEffects } from './store/effects/room.effects';
import { AuthEffects } from './store/effects/auth.effect';
import { CustomerEffects } from './store/effects/customer.effect';
import { MessageEffects } from './store/effects/message.effect';
// Environment
import { environment } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    ReactiveFormsModule,
    CustomerModule,
    EmployeeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot({
      reservation: reservationReducer,
      room: roomReducer,
      auth: authReducer,
      customer: customerReducer,
      message: messageReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ReservationEffects, RoomEffects, AuthEffects, CustomerEffects,MessageEffects]),
    StoreRouterConnectingModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.site_key,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
