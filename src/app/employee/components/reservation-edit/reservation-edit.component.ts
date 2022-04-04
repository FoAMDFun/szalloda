import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { getRooms } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getRoomsSelector } from 'src/app/store/selectors/room.selector';
import { integerValidator } from 'src/app/validators/integer.validator';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {

  constructor(
    private storeRoom: Store<RoomState>,
    private fb: FormBuilder,
  ) {}
  selectedReservation?: Reservation;
  public allRooms$?: Observable<Room[]> = this.storeRoom.pipe(select(getRoomsSelector),map((rooms) => [...rooms]))

  ngOnInit(): void {
    this.storeRoom.dispatch(getRooms());
  }
  public reservationForm: FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []],
    roomId: ['', []],
    numberOfCustomers: ['',[integerValidator]],
    customersId: ['',[]],
    status: ['', [Validators.required]],
  });

  public reservationStatus: ReservationStatus[] = [ReservationStatus.CONFIRMED, ReservationStatus.UNCONFIRMED,  ReservationStatus.RESIDENT ,ReservationStatus.ALREADY_GONE];


  // private lastFormValue: { room: Room | undefined; isUpdating: boolean } = {
  //   room: undefined,
  //   isUpdating: false,
  // };
  // private readonly controllsValue:any = {bed:"Az ágyak ",numberOf:"A szobaszám ",floor:"Az emelet "}
  // private readonly validatorTypes:{pattern:string,maxlength:string,min:string,max:string,required:string,requiredNumber:string,integerError:string} =
  // {pattern:"tartalmaz nem megfelelő karaktert",maxlength:"mező maximum karaktereinek a száma ",integerError:'csak egész értéket vehet fel',min:"nem lehet kevesebb mint ",max:"nem lehet nagyobb mint ",required:"megadása kötelező",requiredNumber:"megadása kötelező és csak számokat tartalmazhat"}
  // readonly validatorValue:any ={floormaxlength:4,bedMin:1,bedMax:20,numberOfMin:1,numberOfMax:1100,floorMin:1,floorMax:10};

  // public getErrorMessage(controllsValue: string,inputType: string): string {
  //   const error = this.formControls[controllsValue].errors as any;
  //   let validationText:string = ''
  //   if(error['integerError']){
  //     validationText = this.validatorTypes['integerError']
  //   }else if (error['min']) {
  //     validationText = this.validatorTypes['min'] + this.validatorValue[controllsValue+'Min']
  //   }else if (error['max']) {
  //     validationText = this.validatorTypes['max'] + this.validatorValue[controllsValue+'Max']
  //   }else if (error['maxlength']) {
  //     validationText = this.validatorTypes['maxlength'] + this.validatorValue[controllsValue+'maxlength']
  //   }else if (error['pattern']) {
  //     validationText = this.validatorTypes['pattern'];
  //   } else if (error['required']) {
  //     if (inputType === 'number') {
  //       validationText = this.validatorTypes['requiredNumber']
  //     }else{
  //       validationText = this.validatorTypes['required']
  //     }
  //   }
  //   return this.controllsValue[controllsValue] + validationText
  // }



}
