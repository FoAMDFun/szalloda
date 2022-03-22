import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservations,
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  reservations$ = this.store.select('reservations');

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

    const ts = Timestamp.fromDate(new Date());
    console.log(ts);

    const dummyReservation: Reservation = {
      comments: getRandomString(),
      customer: getRandomString(),
      startDate: ts,
      endDate: ts,
    };
    this.store.dispatch(addReservation(dummyReservation));
  }
}
