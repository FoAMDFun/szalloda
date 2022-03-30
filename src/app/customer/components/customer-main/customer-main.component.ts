import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';

import { Subscription } from 'rxjs';
import {
  Reservation,
  ReservationStatus,
} from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservations,
  deleteReservation,
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { getAuthUserUidSelector } from 'src/app/store/selectors/auth.selector';
import {
  getReservationsSelector,
  isReservationFilterEmpty,
} from 'src/app/store/selectors/reservation.selector';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit, OnDestroy {
  @ViewChild('startdateref', { static: true }) startDateValue?: ElementRef;
  @ViewChild('enddateref', { static: true }) endDateValue?: ElementRef;
  reservations$ = this.store.pipe(select(getReservationsSelector));
  isReservationsEmpty$ = this.store.pipe(select(isReservationFilterEmpty));
  startDate = new Date();
  endDate = new Date();
  today = new Date();
  public reservationForm: FormGroup = new FormGroup({});
  public roomValues: Number[] = [];
  private currentUID: string = '';
  private uidSub: Subscription;

  constructor(
    private store: Store<ReservationState>,
    private formBuilder: FormBuilder
  ) {
    this.uidSub = this.store
      .pipe(select(getAuthUserUidSelector))
      .subscribe((uid) => (this.currentUID = uid));
    this.reservationForm = this.formBuilder.group({
      roomId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      comments: ['', [Validators.maxLength(100)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfCustomers: [
        '1',
        [Validators.required, Validators.pattern('^[1-4]$')],
      ],
    });

    for (let i = 1; i <= 5; i++) {
      this.roomValues.push(i);
    }

    for (let i = 101; i <= 108; i++) {
      this.roomValues.push(i);
    }

    for (let i = 201; i <= 208; i++) {
      this.roomValues.push(i);
    }

    for (let i = 301; i <= 308; i++) {
      this.roomValues.push(i);
    }
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


    let dummyReservation: Reservation = this.reservationForm.value;
    console.log(this.reservationForm.value);

    dummyReservation.status = ReservationStatus.UNCONFIRMED;
    dummyReservation.customerId = this.currentUID;
    console.log(this.startDate.toString());
    console.log(this.endDate.toString());
    dummyReservation.startDate = Timestamp.fromDate(this.startDate);
    dummyReservation.endDate = Timestamp.fromDate(this.endDate);
    // comments: getRandomString(),
    // numberOfCustomers: 1,
    // customerId: getRandomString(),
    // roomId: 'TWXP8xeBuZz1WNO19tmG',
    // status: ReservationStatus.UNCONFIRMED,
    // _id: this.currentUID,

    this.store.dispatch(addReservation(dummyReservation));
  }

  public deleteReservation(reservation: Reservation): void {
    this.store.dispatch(deleteReservation(reservation));
  }

  parseDate(dateString: string | null): Date {
    if (dateString) {
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
      // this.store.dispatch(
      //   changeReservationDate(
      //     Timestamp.fromDate(this.startDate),
      //     Timestamp.fromDate(this.endDate)
      //   )
      // );
    }
  }

  ngOnDestroy(): void {
    this.uidSub.unsubscribe();
  }
}
