import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import { addRoom, deleteRoom, getRooms } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { roomSelector } from 'src/app/store/selectors/room.selector';
import { IconDefinition, faImage, faTrashAlt,faEdit, faStar} from '@fortawesome/free-solid-svg-icons'
import { map } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public readonly icons:{img:IconDefinition,delete:IconDefinition,edit:IconDefinition,star:IconDefinition} =
  {img:faImage,delete:faTrashAlt,edit:faEdit,star: faStar}
  public rooms$ = this.store.pipe(select(roomSelector));

  constructor(private store: Store<RoomState>) {}


  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.store.dispatch(getRooms());
  }

  newRoom(): void {
    function getRandomString(): string {
      return btoa(Math.random().toString()).substr(10, 15);
    }

    const dummyRoom: Room = {
      bed: Math.floor(Math.random() * 100),
      image: getRandomString(),
      numberOf: Math.floor(Math.random() * 100),
      _id: getRandomString(),
      reviews: []
    };

    this.store.dispatch(addRoom(dummyRoom));
  }


  public deleteRoom(room: Room): void {
    this.store.dispatch(deleteRoom( room ));
  }

  editRoom(room: Room):void {

  }


}


