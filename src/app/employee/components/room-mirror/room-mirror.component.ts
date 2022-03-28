import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';
import { getReservations } from 'src/app/store/actions/reservation.action';
import { getRooms } from 'src/app/store/actions/room.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { reservationSelector } from 'src/app/store/selectors/reservation.selector';
import { roomSelector } from 'src/app/store/selectors/room.selector';

@Component({
  selector: 'app-room-mirror',
  templateUrl: './room-mirror.component.html',
  styleUrls: ['./room-mirror.component.scss']
})
export class RoomMirrorComponent implements OnInit {

  public currentDates: Date[] = [];
  public rooms$ = this.storeRoom.pipe(
    select(roomSelector),
    map((rooms) => {
      const result = [];
      for (const room of rooms) {
        result.push(room);
      }
      return result;
    })
    );

  public styles={btnHeight:34,btnWidth:50,tdHeight:41,tdWidth:57.1333}

  public reservations$ = this.storeReservation.pipe(select(reservationSelector));

  constructor( private storeRoom: Store<RoomState>,private storeReservation: Store<ReservationState>) { }

  ngOnInit(): void {
    this.getReservations();
    this.currentDatesInit();
    this.getRooms();
  }

  private currentDatesInit():void {
    const now =new Date("2022-03-23");
    for (let i = 0; i < 30; i++) {
      const currentDates = new Date(now.getTime()+(86_400_000*(i+1)))
      this.currentDates.push(currentDates)
    }
  }

  private getReservations(): void {
    this.storeReservation.dispatch(getReservations());
  }
  private getRooms(): void {
    this.storeRoom.dispatch(getRooms());
  }

  private getNormalizedDate(date: Date): Date {
    return  new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public getReservationByRoomIdandDate(roomId: string, date: Date): Observable<{reservation:Reservation,colspan:number} | undefined> {
    return this.reservations$.pipe(
      map((reservations) => {
        for (const reservation of reservations) {
          if (reservation.roomId === roomId &&
            (this.twoDateIsEqual(new Date(reservation.startDate.toMillis()),date) ||
            ((this.twoDateIsEqual(date,this.currentDates[0])) &&
            new Date(reservation.startDate.toMillis()) <= date &&
            new Date(reservation.endDate.toMillis()) >= date))
            ) {
            return {
              reservation:reservation,
              colspan:this.getColspan(this.getNormalizedDate(new Date(reservation.endDate.toMillis())),this.getNormalizedDate(date))
            };
          }

        }
        return undefined
      })
    )
  }

  private twoDateIsEqual(date: Date, date2: Date): boolean {
    return date.getFullYear() === date2.getFullYear() &&
    date.getMonth() === date2.getMonth() &&
    date.getDate() === date2.getDate();
  }



  private getColspan(endDate:Date,colDate:Date): number {
    const result = Math.round(((endDate.getTime()-colDate.getTime())/86_400_000))
    return result
  }

  public test(reservation: any):void {
    console.log(reservation)
  }

  shiftOneDayRight():void {
    this.currentDates.shift()
    this.currentDates.push(new Date(this.currentDates[this.currentDates.length-1].getTime()+86_400_000))
  }
  shiftOneDayLeft(): void {
    this.currentDates.pop()
    this.currentDates.unshift(new Date(this.currentDates[0].getTime()-86_400_000))
  }

}

