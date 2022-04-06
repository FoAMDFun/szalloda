import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { deleteRoom, getRooms } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getCurrentRoomSelector } from 'src/app/store/selectors/room.selector';

@Component({
  selector: 'app-delete-room-modal',
  templateUrl: './delete-room-modal.component.html',
  styleUrls: ['./delete-room-modal.component.scss']
})
export class DeleteRoomModalComponent implements OnInit {

  public selectedDeleteRoom?: Observable<Room | null> =this.store.pipe(select(getCurrentRoomSelector));

  constructor(
    public modalRef: MdbModalRef<DeleteRoomModalComponent>,
    private store: Store<RoomState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getRooms());

  }

  public deleteRoom(): void {
    if (this.selectedDeleteRoom) {
      this.store.dispatch(deleteRoom());
      //törölni kéne a képeket is ha már nem használja senki
      // a deleteRoom dispatch-elhet egy deletePictures-t is a props pedig a képek linktömbje
    }
    this.modalRef.close();
  }
}
