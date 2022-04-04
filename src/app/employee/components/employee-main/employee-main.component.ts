import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getReservations, setCurrendReservation } from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import {  getUnconfirmedReservation } from 'src/app/store/selectors/reservation.selector';
import { faArrowDown,faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { Message } from 'src/app/models/message.model';
import { addMessage, getMessages, updateMessage } from 'src/app/store/actions/message.action';
import { Timestamp } from 'firebase/firestore';
import { getUnreadMessagesSelector } from 'src/app/store/selectors/message.selector';
import { map, Observable, Subscription } from 'rxjs';
import { MessageState } from 'src/app/store/reducers/message.reducer';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { getCustomerByIdSelector } from 'src/app/store/selectors/customer.selector';
import { getCustomers } from 'src/app/store/actions/customer.action';
import { Reservation } from 'src/app/models/reservation.model';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getRooms } from 'src/app/store/actions/room.action';
import { getRoomByIdSelector } from 'src/app/store/selectors/room.selector';
import { Room } from 'src/app/models/room.model';
@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.scss']
})
export class EmployeeMainComponent implements OnInit {

  public readonly icons: {
    down: IconDefinition;
    up: IconDefinition;
  } = {
    down: faArrowDown,
    up: faArrowUp,
  };
  public readonly arrowsControll:{reservationsOffset:number,messagesOffset:number ,reservationsStart:number,reservationsEnd:number,messagesStart:number,messagesEnd:number} =
  {reservationsStart:0,reservationsEnd:6,messagesStart:0,messagesEnd:5,messagesOffset:0,reservationsOffset:0};

  public unconfirmedReservations$: Observable<Reservation[]> =
  this.storeReservation.pipe(select(getUnconfirmedReservation),
    map(res => [...res].sort((a,b) => {
    if (a.startDate < b.startDate)
      return -1;
    if (a.startDate > b.startDate)
      return 1;
    return 0;
  })))
  public unconfirmedReservationSub?: Subscription;
  private unconfirmedReservationLength?: number;
  public messages$:Observable<Message[]>=
  this.storeMessage.pipe(select(getUnreadMessagesSelector),
  map(res => [...res].sort((a,b) => {
  if (a.date < b.date)
    return -1;
  if (a.date > b.date)
    return 1;
  return 0;
})))
  public messagesLengthSub?: Subscription;
  private messagesLength?:number;
  constructor(
    private storeMessage: Store<MessageState>,
    private storeReservation: Store<ReservationState>,
    private storeCustomer: Store<CustomerState>,
    private storeRoom: Store<RoomState>,
    ) { }

  ngOnInit(): void {
    this.storeReservation.dispatch(getReservations());
    this.storeMessage.dispatch(getMessages())
    this.storeCustomer.dispatch(getCustomers())
    this.storeRoom.dispatch(getRooms())
    // <!-- foglalást rendezni kéne start szerint, és az üzeneteket is -->

    this.messagesLengthSub = this.messages$.subscribe({
      next: (messages: Message[]) => {
        this.messagesLength = messages.length;
      },
      error: (err: any) => {},
      complete: () => {},
    });

    this.unconfirmedReservationSub = this.unconfirmedReservations$.subscribe({
      next: (reservations: Reservation[]) => {
        this.unconfirmedReservationLength = reservations.length;
      },
      error: (err: any) => {},
      complete: () => {},
    })
  }

  public massageUpClick():void{
    if (this.arrowsControll.messagesOffset===0) {
      return
    }
    this.arrowsControll.messagesOffset--;
  }

  public massageDownClick():void{
    if (this.messagesLength===undefined) {
      return
    }
    if (this.arrowsControll.messagesOffset + this.arrowsControll.messagesEnd>=this.messagesLength) {
      return
    }
    this.arrowsControll.messagesOffset++;
  }

  public unconfirmedReservationUpClick():void{
    if (this.arrowsControll.reservationsOffset === 0) {
      return
    }
    this.arrowsControll.reservationsOffset--;
  }

  public unconfirmedReservationDownClick():void{
    if (this.unconfirmedReservationLength===undefined) {
      return
    }
    if (this.arrowsControll.reservationsOffset + this.arrowsControll.reservationsEnd>=this.unconfirmedReservationLength) {
      return
    }
    this.arrowsControll.reservationsOffset++;
  }


  public editReservation(reservation: Reservation):void{
    this.storeReservation.dispatch(setCurrendReservation(reservation));
  }




  randomMessageGenerator():void{
    let dummy: Message = {
      senderId: 'wnhhbZvAlGljF6SRirle',
      receiverId: 'PORTA',
      title: 'Новое сообщение',
      text: 'Вы получили новое сообщение',
      date: Timestamp.fromDate(new Date()),
      isRead: false,
      _id: '',
    }
    this.storeMessage.dispatch(addMessage(dummy));
  }

  public sliceCurrentMessages(messages:Message[] | null): Message[] | undefined {
    if (messages === null) {
      return undefined;
    }
    return messages.slice(this.arrowsControll.messagesStart+this.arrowsControll.messagesOffset,
      this.arrowsControll.messagesEnd+this.arrowsControll.messagesOffset);
  }

  public sliceUnconfirmedReservations(reservations:Reservation[] | null): Reservation[] | undefined {
    if (reservations === null) {
      return undefined;
    }
    return reservations.slice(this.arrowsControll.reservationsStart+this.arrowsControll.reservationsOffset,
      this.arrowsControll.reservationsEnd+this.arrowsControll.reservationsOffset);
  }




  public getSenderFullName(senderId:string):Observable<string | undefined>{
    return this.storeCustomer.select(getCustomerByIdSelector(senderId)).pipe(map(sender=>sender?.firstName+' '+sender?.lastName));
  }

  public read(massage:Message):void{
    this.storeMessage.dispatch(updateMessage({...massage,isRead:true}))
  }


  public getRoomNumberOfById(roomId:string):Observable<Room| undefined> {
    return this.storeRoom.select(getRoomByIdSelector(roomId))
  }

}
