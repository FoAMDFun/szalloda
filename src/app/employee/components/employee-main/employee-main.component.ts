import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getReservations } from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import {  getUnconfirmedReservation } from 'src/app/store/selectors/reservation.selector';
import { faArrowDown,faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { Message } from 'src/app/models/message.model';
import { addMessage, getMessages } from 'src/app/store/actions/message.action';
import { Timestamp } from 'firebase/firestore';
import { getUnreadMessagesSelector } from 'src/app/store/selectors/message.selector';
import { map, Observable, Subscription } from 'rxjs';
import { MessageState } from 'src/app/store/reducers/message.reducer';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { getCustomerByIdSelector } from 'src/app/store/selectors/customer.selector';
import { getCustomers } from 'src/app/store/actions/customer.action';
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
  public readonly arrowsControll:{messagesOffset:number ,reservationsStart:number,reservationsEnd:number,messagesStart:number,messagesEnd:number} =
  {reservationsStart:0,reservationsEnd:6,messagesStart:0,messagesEnd:5,messagesOffset:0};

  public unconfirmedReservations$ = this.storeReservation.pipe(select(getUnconfirmedReservation))
  public messages$:Observable<Message[]>=this.storeMessage.pipe(select(getUnreadMessagesSelector));
  public messagesLengthSub?: Subscription;
  private messagesLength?:number;
  constructor(
    private storeMessage: Store<MessageState>,
    private storeReservation: Store<ReservationState>,
    private storeCustomer: Store<CustomerState>,
    ) { }

  ngOnInit(): void {
    this.storeReservation.dispatch(getReservations());
    this.storeMessage.dispatch(getMessages())
    this.storeCustomer.dispatch(getCustomers())
    this.messagesLengthSub = this.messages$.subscribe({
      next: (messages: Message[]) => {
        this.messagesLength = messages.length;
      },
      error: (err: any) => {},
      complete: () => {},
    });
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



  randomMessageGenerator():void{
    let dummy: Message = {
      senderId: 'wnhhbZvAlGljF6SRirle',
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


  public getSenderFullName(senderId:string):Observable<string | undefined>{
    return this.storeCustomer.select(getCustomerByIdSelector(senderId)).pipe(map(sender=>sender?.firstName+' '+sender?.lastName));
  }

}
