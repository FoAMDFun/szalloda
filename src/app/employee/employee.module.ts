import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmployeeComponent } from './employee.component';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { RoomMirrorComponent } from './components/room-mirror/room-mirror.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { SortPipe } from '../pipes/sort.pipe';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeMainComponent,
    RoomMirrorComponent,
    RoomListComponent,
    NavbarComponent,
    SortPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: Window, useValue: window },
  ],
})
export class EmployeeModule {}
