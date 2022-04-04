import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { getRooms } from 'src/app/store/actions/room.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getCurrentReservation } from 'src/app/store/selectors/reservation.selector';
import { getRoomsSelector } from 'src/app/store/selectors/room.selector';
import { integerValidator } from 'src/app/validators/integer.validator';
import { getReservations, updateReservation } from '../../../store/actions/reservation.action';
@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {

  public readonly icons: {plus: IconDefinition;} = {plus: faPlusCircle};
  constructor(
    private storeReservation: Store<ReservationState>,
    private storeRoom: Store<RoomState>,
    private fb: FormBuilder,
  ) {}
  selectedReservation? : Observable<Reservation | null> =this.storeReservation.pipe(select(getCurrentReservation));
  public allRooms$?: Observable<Room[]> = this.storeRoom.pipe(select(getRoomsSelector),map((rooms) => [...rooms]))

  ngOnInit(): void {
    this.storeReservation.dispatch(getReservations());
    this.storeRoom.dispatch(getRooms());
    this.selectedReservation?.subscribe(reservation => {
      if (reservation) {
        this.reservationForm.patchValue({...reservation,startDate:reservation.startDate.toDate(),endDate: reservation.endDate.toDate()});
      }
    })
  }
  public reservationForm: FormGroup = this.fb.group({
    _id: [''],
    comments: [''],
    startDate: ['', []],
    endDate: ['', []],
    roomId: ['', [Validators.required]],
    numberOfCustomers: ['',[integerValidator,Validators.min(1)]],
    customersId: ['',[]],
    customerId: ['',[]],
    status: ['', [Validators.required]],
  });

  public constants:{maxDate:string, minDate: string} = {maxDate:'2023-12-31', minDate: '2021-12-31'}

  public reservationStatus: {text: string, value:ReservationStatus}[] =
  [
    {text:'Visszaigazolatlan',value:ReservationStatus.UNCONFIRMED},
    {text:'Visszaigazolt',value:ReservationStatus.CONFIRMED},
    {text:'Elutazott',value:ReservationStatus.ALREADY_GONE},
    {text:'Lakó',value:ReservationStatus.RESIDENT},
  ]

  public saveReservation():void {
    this.storeReservation.dispatch(updateReservation(this.reservationForm.value));
  }






}


