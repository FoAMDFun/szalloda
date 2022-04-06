import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import {
  getRooms,
  setCrudMode,
  setCurrentRoom,
} from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import {  getRoomsSelector } from 'src/app/store/selectors/room.selector';
import {
  IconDefinition,
  faImage,
  faTrashAlt,
  faEdit,
  faStar,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { AddRoomModalComponent } from '../add-room-modal/add-room-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CRUDMode } from 'src/app/models/mode.models';
import { DeleteRoomModalComponent } from '../delete-room-modal/delete-room-modal.component';
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {

  public readonly icons: {
    true: IconDefinition;
    false: IconDefinition;
    img: IconDefinition;
    delete: IconDefinition;
    edit: IconDefinition;
    star: IconDefinition;
  } = {
    true: faCheckCircle,
    false: faTimesCircle,
    img: faImage,
    delete: faTrashAlt,
    edit: faEdit,
    star: faStar,
  };
  public addModalRef: MdbModalRef<AddRoomModalComponent> | null = null;
  public deleteModalRef: MdbModalRef<DeleteRoomModalComponent> | null = null;
  public rooms$ = this.store.pipe(
    select(getRoomsSelector),
    map((rooms) => {
      const result = [];
      for (const room of rooms) {
        result.push(room);
      }
      return result;
    })
  );

  constructor(
    private store: Store<RoomState>,
    private modalService: MdbModalService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getRooms());
  }

  public deleteRoom(room: Room):void{
    this.store.dispatch(setCurrentRoom(room))
    this.store.dispatch(setCrudMode(CRUDMode.DELETE));
    this.deleteModalRef = this.modalService.open(DeleteRoomModalComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  public editRoom(room: Room): void {
    this.store.dispatch(setCurrentRoom(room))
    this.store.dispatch(setCrudMode(CRUDMode.UPDATE));
    this.addModalRef = this.modalService.open(AddRoomModalComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  public newRoom(): void {
    this.store.dispatch(setCrudMode(CRUDMode.CREATE));
    this.addModalRef = this.modalService.open(AddRoomModalComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

}
