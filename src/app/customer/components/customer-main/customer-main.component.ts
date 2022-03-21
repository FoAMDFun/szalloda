import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservationsStart,
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  reservations: Reservation[] = [];
  reservations$ = this.store.select('reservations');

  constructor(private store: Store<ReservationState>) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservations = [
      {
        comments: 'Teszt',
        customer: 'Józsi',
        endDate: new Date(),
        startDate: new Date(),
      },
      {
        comments: 'Teszt2',
        customer: 'Béla',
        endDate: new Date(),
        startDate: new Date(),
      },
      {
        comments: 'Teszt3',
        customer: 'Ancsi',
        endDate: new Date(),
        startDate: new Date(),
      },
      {
        comments: 'Teszt4',
        customer: 'Leó',
        endDate: new Date(),
        startDate: new Date(),
      },
    ];
    this.store.dispatch(getReservationsStart());
  }

  newReservation(): void {
    const dummyReservation: Reservation = {
      comments: 'Dummy',
      customer: 'Dummy Customer',
      endDate: new Date(),
      startDate: new Date(),
    };
    this.store.dispatch(addReservation(dummyReservation));
    this.reservations.push(dummyReservation);
  }
}
