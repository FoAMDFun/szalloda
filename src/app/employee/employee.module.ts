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

import { ReservationEditComponent } from './components/reservation-edit/reservation-edit.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { SharedModule } from '../shared/shared.module';
import { AddRoomModalComponent } from './components/add-room-modal/add-room-modal.component';
import { DeleteRoomModalComponent } from './components/delete-room-modal/delete-room-modal.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeMainComponent,
    RoomMirrorComponent,
    RoomListComponent,
    NavbarComponent,
    ReservationEditComponent,
    AddRoomModalComponent,
    DeleteRoomModalComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    FontAwesomeModule,
    MdbModalModule,
  ],
  providers: [{ provide: Window, useValue: window }],
})
export class EmployeeModule {}
