import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import {
  getReservationWithFilterSelector,
  isReservationFilterEmpty,
} from 'src/app/store/selectors/reservation.selector';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  @ViewChild('startdateref', { static: true }) startDateValue?: ElementRef;
  @ViewChild('enddateref', { static: true }) endDateValue?: ElementRef;
  reservations$ = this.store.pipe(select(getReservationWithFilterSelector));
  isReservationsEmpty$ = this.store.pipe(select(isReservationFilterEmpty));
  startDate = new Date('2022-01-01T00:00:00');
  endDate = new Date();
  today = Date.now();
  public reservationForm: FormGroup = new FormGroup({});

  constructor(
    private store: Store<ReservationState>,
    private formBuilder: FormBuilder
  ) {
    this.reservationForm = this.formBuilder.group({
      roomId: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfCustomers: ['', [Validators.required]],
    });
  }

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
      numberOfCustomers: 1,
      customerId: getRandomString(),
      roomId: 'TWXP8xeBuZz1WNO19tmG',
      startDate: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 3
        )
      ),
      _id: getRandomString(),
    };
    this.store.dispatch(addReservation(dummyReservation));
  }

  public deleteReservation(reservation: Reservation): void {
    this.store.dispatch(deleteReservation(reservation));
  }

  parseDate(dateString: string | null): Date {
    if (dateString) {
      console.log(dateString);
      const resultDate = new Date(dateString);
      if (
        resultDate.toString() !== 'Invalid Date' &&
        resultDate.getFullYear() <= new Date().getFullYear() + 1
      ) {
        return resultDate;
      }
    }
    return new Date();
  }

  dispatchDateChange(): void {
    try {
      this.startDate = this.parseDate(this.startDateValue?.nativeElement.value);
      this.endDate = this.parseDate(this.endDateValue?.nativeElement.value);
      if (this.endDate.getFullYear() < new Date().getFullYear()) {
        this.endDate = new Date();
      }
      if (this.startDate.getFullYear() > new Date().getFullYear()) {
        this.startDate = new Date();
      }
    } catch (error) {
      this.startDate.setMilliseconds(Date.now());
      this.endDate.setMilliseconds(Date.now());
      console.error(error);
    } finally {
      this.store.dispatch(
        changeReservationDate(
          Timestamp.fromDate(this.startDate),
          Timestamp.fromDate(this.endDate)
        )
      );
    }
  }
}
