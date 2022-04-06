import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { map, Observable, Subscription } from 'rxjs';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { addCustomer, getCustomers, updateCustomer } from 'src/app/store/actions/customer.action';
import { getRooms } from 'src/app/store/actions/room.action';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getCustomerByIdSelector, getCustomerIdByCustomer } from 'src/app/store/selectors/customer.selector';
import { getCurrentReservation } from 'src/app/store/selectors/reservation.selector';
import { getRoomsSelector, getRoomByIdSelector } from 'src/app/store/selectors/room.selector';
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
    private storeCustomer:Store<CustomerState>,
    public modalRef: MdbModalRef<ReservationEditComponent>,
  ) {}
  selectedReservation? : Observable<Reservation | null> =this.storeReservation.pipe(select(getCurrentReservation));
  public allRooms$?: Observable<Room[]> = this.storeRoom.pipe(select(getRoomsSelector),map((rooms) => [...rooms]))

  ngOnInit(): void {
    this.storeCustomer.dispatch(getCustomers())
    this.storeReservation.dispatch(getReservations());
    this.storeRoom.dispatch(getRooms());
    this.selectedReservation?.subscribe(reservation => {
      if (reservation) {
        this.reservationForm.patchValue({
          _id:reservation._id,
          startDate: this.dateToString(reservation.startDate.toDate()),
          endDate: this.dateToString(reservation.endDate.toDate()),
          roomId:reservation.roomId,
          numberOfCustomers:reservation.numberOfCustomers,
          comments:reservation.comments,
          status:reservation.status,
          customerId:reservation.customerId,
        });
        this.customersForm.clear()
        let j = reservation.numberOfCustomers;
        if (reservation?.customersId) {
          reservation?.customersId.forEach(id => this.addCustomerId(id))
          j=j-reservation?.customersId.length
        }
        for (let i = 0; i < j; i++) {
          this.addCustomerId("kitöltetlen");
          }
        }
      }
    )
  }

  dateToString(date: Date): string {
    return date.getFullYear() + '-' +
    ((date.getMonth()+1<10)? '0' + (date.getMonth()+1):(date.getMonth()+1))+ '-' +
    ((date.getDate()<10)? '0' + date.getDate():date.getDate());
  }


  change(){
    console.log(this.reservationForm.value);
  }

  public reservationForm: FormGroup = this.fb.group({
    _id: ['', []],
    comments: ['', []],
    startDate: ['', [Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]],
    endDate: ['', [Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]],
    roomId: ['', [Validators.required]],
    numberOfCustomers: ['',[integerValidator,Validators.min(1)]],
    customersId: this.fb.array([]),
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
    const reservation = {
      ...this.reservationForm.value,
      startDate: new Date(this.reservationForm.value.startDate),
      endDate: new Date(this.reservationForm.value.endDate),
      customersId: [...this.customersForm.value].map((customerId:any) => customerId._id)
    }
    this.storeReservation.dispatch(updateReservation(reservation));
    this.modalRef.close()
  }
  get customersForm():FormArray{
    return this.reservationForm.get('customersId') as FormArray;
  }

  addCustomerId(id:string):void{
    const user =this.fb.group({
      _id: [id,[]],
    })
    this.customersForm.push(user);
  }



  public currentCustomerForm: FormGroup = this.fb.group({
    _id: [null,[]],
    nationality: ['',[]],
    firstName: ['', []],
    lastName: ['', []],
    birthPlace: ['', []],
    birthDate: ['', []],
    email: ['', []],
  });

  selectCustomer(id: string, FormArrayIndex: number): void {
    this.storeCustomer.pipe(select(getCustomerByIdSelector(id))).subscribe(customer => {
      if(customer){
        this.currentCustomerForm.setValue(customer)
      }else{
        this.currentCustomerForm.reset()
      }
      this.lastFormArrayIndex = FormArrayIndex;
    })
  }
  lastFormArrayIndex?: number
  lastGetCustomerIdByCustomerSub?:Subscription

  customerSave(): void {
    if (this.currentCustomerForm.value._id) {
      this.storeCustomer.dispatch(updateCustomer(this.currentCustomerForm.value));
    }else{
      this.storeCustomer.dispatch(addCustomer(this.currentCustomerForm.value));

      this.lastGetCustomerIdByCustomerSub = this.storeCustomer.pipe(select(getCustomerIdByCustomer(this.currentCustomerForm.value))).subscribe(id => {
        if(id && this.lastFormArrayIndex !== undefined){
          this.customersForm?.at(this.lastFormArrayIndex).setValue({_id:id})
        }
        this.lastGetCustomerIdByCustomerSub?.unsubscribe()
      })
    }

    }

    ngOnDestroy(): void {
      this.lastGetCustomerIdByCustomerSub?.unsubscribe()
    }


    getRoomIsExistById(id: string):Observable<boolean> {
      console.log(id);
      return this.storeRoom.pipe(select(getRoomByIdSelector(id)),map(room => room !== undefined))
    }
}


