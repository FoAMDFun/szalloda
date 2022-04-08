import { Component, OnDestroy, OnInit } from '@angular/core';
// Md-bootstrap
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
// Ngrx
import { Store } from '@ngrx/store';
import * as ReservationModel from 'src/app/models/reservation.model';
import * as ReservationActions from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';

import { NewReservationComponent } from './new-reservation/new-reservation.component';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit, OnDestroy {
  modalRef: MdbModalRef<NewReservationComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private store: Store<ReservationState>
  ) {}

  ngOnInit(): void {
    this.openAdd();
  }
  public deleteReservation(reservation: ReservationModel.Reservation): void {
    this.store.dispatch(ReservationActions.deleteReservation(reservation));
  }
  getReservations(): void {
    this.store.dispatch(ReservationActions.getReservations());
  }

  openAdd(): void {
    this.modalRef = this.modalService.open(NewReservationComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  ngOnDestroy(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
