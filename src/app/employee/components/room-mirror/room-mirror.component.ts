import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Reservation } from 'src/app/models/reservation.model';
import { getReservations } from 'src/app/store/actions/reservation.action';
import { getRooms } from 'src/app/store/actions/room.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getReservationsSelector } from 'src/app/store/selectors/reservation.selector';
import { getRoomsSelector } from 'src/app/store/selectors/room.selector';
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  IconDefinition,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room-mirror',
  templateUrl: './room-mirror.component.html',
  styleUrls: ['./room-mirror.component.scss'],
})
export class RoomMirrorComponent implements OnInit {
  public readonly icons: {
    previous: IconDefinition;
    next: IconDefinition;
    doubleNext: IconDefinition;
    doublePrevious: IconDefinition;
  } = {
    previous: faAngleLeft,
    next: faAngleRight,
    doubleNext: faAngleDoubleRight,
    doublePrevious: faAngleDoubleLeft,
  };
  public currentDates: Date[] = [];
  public rooms$ = this.storeRoom.pipe(
    select(getRoomsSelector),
    map((rooms) => {
      const result = [];
      for (const room of rooms) {
        result.push(room);
      }
      return result;
    })
  );

  public styles = {
    btnHeight: 34,
    btnWidth: 50,
    tdHeight: 41,
    tdWidth: 57.1333,
    td1Width: 60,
    tablecorrection: 2,
  };
  public reservations$ = this.storeReservation.pipe(
    select(getReservationsSelector)
  );
  public currentDateLenght: Subject<number> = new BehaviorSubject(
    this._window.innerWidth
  );
  public selectedReservation?: Reservation;

  constructor(
    private storeRoom: Store<RoomState>,
    private storeReservation: Store<ReservationState>,
    private _window: Window
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calcCurrentDateLength(event.target.innerWidth);
  }
  calcCurrentDateLength(innerWidth: number): void {
    const length =
      Math.floor(innerWidth / this.styles.tdWidth) -
      this.styles.tablecorrection-1;
    this.currentDateLenght.next(length);
  }

  ngOnInit(): void {
    this.getReservations();
    this.currentDatesInit();
    this.getRooms();
    this.calcCurrentDateLength(this._window.innerWidth);
  }

  private currentDatesInit(): void {
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(now.getTime() + 86_400_000 * i);
      this.currentDates.push(currentDate);
    }
  }

  private getReservations(): void {
    this.storeReservation.dispatch(getReservations());
  }
  private getRooms(): void {
    this.storeRoom.dispatch(getRooms());
  }

  private getNormalizedDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  public getReservationByRoomIdandDate(
    roomId: string,
    date: Date
  ): Observable<{ reservation: Reservation; colspan: number } | undefined> {
    return this.reservations$.pipe(
      map((reservations) => {
        for (const reservation of reservations) {
          if (
            reservation.roomId === roomId &&
            (this.twoDateIsEqual(new Date(reservation.startDate.toMillis()),date) ||
              (this.twoDateIsEqual(date, this.currentDates[0]) &&
                new Date(reservation.startDate.toMillis()) <= date &&
                new Date(reservation.endDate.toMillis()) >= date))
          ) {
            return {
              reservation: reservation,
              colspan: this.getColspan(
                this.getNormalizedDate(
                  new Date(reservation.endDate.toMillis())
                ),
                this.getNormalizedDate(date)
              ),
            };
          }
        }
        return undefined;
      })
    );
  }

  private twoDateIsEqual(date: Date, date2: Date): boolean {
    return (
      date.getFullYear() === date2.getFullYear() &&
      date.getMonth() === date2.getMonth() &&
      date.getDate() === date2.getDate()
    );
  }

  private getColspan(endDate: Date, colDate: Date): number {
    const result = Math.round(
      (endDate.getTime() - colDate.getTime()) / 86_400_000
    );
    return result;
  }

  public selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }

  shiftOneDayRight(): void {
    this.currentDates.shift();
    this.currentDates.push(
      new Date(
        this.currentDates[this.currentDates.length - 1].getTime() + 86_400_000
      )
    );
  }
  shiftOneDayLeft(): void {
    this.currentDates.pop();
    this.currentDates.unshift(
      new Date(this.currentDates[0].getTime() - 86_400_000)
    );
  }

  shiftOneWeekLeft(): void {
    for (let i = 0; i < 7; i++) {
      this.shiftOneDayLeft();
    }
  }

  shiftOneWeekRight(): void {
    for (let i = 0; i < 7; i++) {
      this.shiftOneDayRight();
    }
  }

  public isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  public dateIsToday(date: Date): boolean {
    return (
      date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth() &&
      date.getDate() === new Date().getDate()
    );
  }

  currentDatesslice(start: number, end: number | null): Date[] | undefined {
    if (end !== null) {
      return this.currentDates.slice(start, end);
    }
    return undefined;
  }
}
