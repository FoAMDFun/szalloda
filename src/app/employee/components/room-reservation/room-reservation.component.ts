import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Timestamp } from 'firebase/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import {
  addReservation,
  getReservations,
  deleteReservation
} from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss']
})
export class RoomReservationComponent implements OnInit {

  reservations$ = this.store.select('reservations');

  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear(), this.minDate.getMonth()+6, this.minDate.getDay());

  currentDate:Date = new Date();

  SelectDate(): void {
    console.log(this.range.value);
  }

  saveProperty(): void {

  }

  public range : FormGroup=this._fb.group({
    start:['', [Validators.required]],
    end:['',[Validators.required]],
  })

  // mettől SZERETNÉK?  meddig?? meliyk szoba?

  constructor(private store: Store<ReservationState>,private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.getReservations();
    // this.setMinMaxDate()
    console.log(this.minDate,this.maxDate);
  }

  // private setMinMaxDate(): void {
  //   const currentYear = new Date();
  //   this.minDate = new Date(currentYear);
  //   this.maxDate = new Date(currentYear.getFullYear(), currentYear.getMonth()+6, currentYear.getDay());
  // }

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
      customerId: getRandomString(),
      roomId: getRandomString(),
      startDate: ts,
      endDate: ts,
    };
    this.store.dispatch(addReservation(dummyReservation));
  }

  public deleteReservation(reservation:Reservation): void {
    this.store.dispatch(deleteReservation(reservation));
  }
}
