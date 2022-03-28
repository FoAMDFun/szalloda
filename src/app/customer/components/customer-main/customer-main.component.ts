import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservations,
  deleteReservation,
  changeReservationDate,
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { getReservationFilterSelector } from 'src/app/store/selectors/reservation.selector';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  @ViewChild('startdateref', { static: true }) startDateValue?: ElementRef;
  @ViewChild('enddateref', { static: true }) endDateValue?: ElementRef;
  reservations$ = this.store.pipe(select(getReservationFilterSelector));
  startDate = new Date('2022-01-01T00:00:00');
  endDate = new Date();

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

  parseDate(dateString: string | null): Date {
    console.log(`date changed, ${this.startDate}, ${this.endDate}`);
    if (dateString) {
      return new Date(dateString);
    }
    return new Date();
  }

  dispatchDateChange(): void {
    this.startDate = new Date(this.startDateValue?.nativeElement.value);
    this.endDate = new Date(this.endDateValue?.nativeElement.value);
    this.store.dispatch(
      changeReservationDate({
        startDate: Timestamp.fromDate(this.startDate),
        endDate: Timestamp.fromDate(this.endDate),
      })
    );
  }
}
