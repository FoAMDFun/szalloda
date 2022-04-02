import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getReservations } from 'src/app/store/actions/reservation.action';
import { ReservationState } from 'src/app/store/reducers/reservation.reducer';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getReservationsSelector, getUnconfirmedReservation } from 'src/app/store/selectors/reservation.selector';
import {faArrowDown,faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';
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
  public readonly arrowsControll:{massagesOffset:number ,reservationsStart:number,reservationsEnd:number,massagesStart:number,massagesEnd:number} =
  {reservationsStart:0,reservationsEnd:6,massagesStart:0,massagesEnd:5,massagesOffset:0};

  public unconfirmedReservations$ = this.storeReservation.pipe(select(getUnconfirmedReservation))
  public massages:{sender:string,title:string,text:string}[] = [
    {sender:'admin',title:'Новое сообщение',text:'Вы получили новое сообщение'},
    {sender:'józsi',title:'Kérdés',text:'Mikor lehet érkezni a szobába?'},
    {sender:"Béla",title:"Kérdés",text:"Mikor lehet érkezni a szobába?"},
    {sender:"Béla",title:"Kérdés",text:"Mikor lehet érkezni a szobába?"},
    {sender:"Béla",title:"Kérdés",text:"Mikor lehet érkezni a szobába?"},
    {sender:"Béla",title:"Kérdés",text:"Mikor lehet érkezni a szobába?"},
    {sender:"Béla",title:"Kérdés",text:"Mikor lehet érkezni a szobába?"},
    {sender:"juli",title:"KérdésJuli",text:"Mikor lehet érkezni a szobába?"},
    {sender:"andrás",title:"KérdésA",text:"Mikor lehet érkezni a szobába?"},
  ];
  constructor(
    private store: Store<RoomState>,
    private storeReservation: Store<ReservationState>,
    ) { }

  ngOnInit(): void {
    this.store.dispatch(getReservations());
  }

  massageUpClick():void{
    if (this.arrowsControll.massagesOffset===0) {
      return
    }
    this.arrowsControll.massagesOffset--;
  }

  massageDownClick():void{
    if (this.arrowsControll.massagesOffset + this.arrowsControll.massagesEnd===this.massages.length) {
      return
    }
    this.arrowsControll.massagesOffset++;
  }


}
