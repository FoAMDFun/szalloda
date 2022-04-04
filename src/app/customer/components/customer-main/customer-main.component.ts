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
import * as ReservationModel from 'src/app/models/reservation.model';
import * as ReservationActions from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import * as AuthSelector from 'src/app/store/selectors/auth.selector';
import * as ReservationSelector from 'src/app/store/selectors/reservation.selector';

@Component({
  selector: 'app-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit, OnDestroy {
  @ViewChild('startdateref', { static: true }) startDateValue?: ElementRef;
  @ViewChild('enddateref', { static: true }) endDateValue?: ElementRef;
  reservations$ = this.store.pipe(
    select(ReservationSelector.getReservationsSelector)
  );
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
      .pipe(select(AuthSelector.getAuthUserUidSelector))
      .subscribe((uid) => (this.currentUID = uid));
    this.reservationForm = this.formBuilder.group({
      roomId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      comments: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfCustomers: [
        '1',
        [Validators.required, Validators.pattern('^[1-4]$')],
      ],
    });

    // Create room list
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
    this.store.dispatch(ReservationActions.getReservations());
  }

  newReservation(): void {
    let dummyReservation: ReservationModel.Reservation =
      this.reservationForm.value;

    dummyReservation.status = ReservationModel.ReservationStatus.UNCONFIRMED;
    dummyReservation.customerId = this.currentUID;

    dummyReservation.startDate = Timestamp.fromDate(this.startDate);
    dummyReservation.endDate = Timestamp.fromDate(this.endDate);

    // rotate the two variables (startDate and endDate) if startDate is after endDate
    if (dummyReservation.startDate.seconds > dummyReservation.endDate.seconds) {
      const temp = dummyReservation.startDate;
      dummyReservation.startDate = dummyReservation.endDate;
      dummyReservation.endDate = temp;
    }

    this.store.dispatch(ReservationActions.addReservation(dummyReservation));
  }

  public deleteReservation(reservation: ReservationModel.Reservation): void {
    this.store.dispatch(ReservationActions.deleteReservation(reservation));
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
    }
  }

  ngOnDestroy(): void {
    this.uidSub.unsubscribe();
  }
}
