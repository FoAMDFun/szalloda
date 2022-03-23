import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservations,
  deleteReservation,
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { reservationSelector } from 'src/app/store/selectors/reservation.selector';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  reservations$ = this.store.pipe(select(reservationSelector));
  currentDate = new Date();

  constructor(private store: Store<ReservationState>) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.store.dispatch(getReservations());
  }

  newReservation(): void {
    function getRandomString(): string {
      return btoa(Math.random().toString()).substr(10, 15);
    }

    const dummyReservation: Reservation = {
      comments: getRandomString(),
      customerId: getRandomString(),
      roomId: getRandomString(),
      startDate: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(new Date()),
      _id: getRandomString(),
    };
    this.store.dispatch(addReservation({ reservation: dummyReservation }));
  }

  public deleteReservation(reservation: Reservation): void {
    this.store.dispatch(deleteReservation({ reservation }));
  }
}
