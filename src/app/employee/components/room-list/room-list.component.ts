import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import { addRoom, deleteRoom, getRooms } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { roomSelector } from 'src/app/store/selectors/room.selector';
import { IconDefinition, faImage, faTrashAlt,faEdit, faStar} from '@fortawesome/free-solid-svg-icons'
import { map, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public readonly icons:{img:IconDefinition,delete:IconDefinition,edit:IconDefinition,star:IconDefinition} =
  {img:faImage,delete:faTrashAlt,edit:faEdit,star: faStar}

  public rooms$ = this._store.pipe(select(roomSelector),map(rooms=>{
    const result = [];
    for (const room of rooms){
      result.push(room)
    }
    return result
  }))
  // private roomSub?: Subscription;
  // public rooms: Room[] = [];
  public newRoomForm: FormGroup = this._fb.group({
    bed: ['', [Validators.required,Validators.min(0)]],
    numberOf: ['', [Validators.required]],
    // image: ['', [Validators.required]],
    // reviews: ['', [Validators.required]],
    });

  constructor(private _store: Store<RoomState>,private  _fb : FormBuilder) {}


  ngOnInit(): void {
    this.getRooms();
    // this.roomSub = this._store.pipe(select(roomSelector)).subscribe({
    //     next:(rooms)=>{
    //       this.RoomInit(rooms)
    //     },
    //     error:(err)=>{console.log(err)},
    //     complete:()=>{}
    //   }
    // )
  }

  // ngOnDestroy(): void {
  //   this.roomSub?.unsubscribe()
  // }

  // RoomInit(rooms: ReadonlyArray<Room>){
  //   for (let i = 0; i < rooms.length; i++) {
  //     this.rooms.push(rooms[i]);
  //   }
  // }

  getRooms(): void {
    this._store.dispatch(getRooms());
  }

  newRandomRoom(): void {
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

    this._store.dispatch(addRoom(dummyRoom));
  }


  public deleteRoom(room: Room): void {
    this._store.dispatch(deleteRoom( room ));
  }

  editRoom(room: Room):void {

  }




submitted = false;
//Add user form actions
get formControlls() { return this.newRoomForm.controls; }
onSubmit() {

  this.submitted = true;
  // stop here if form is invalid
  if (this.newRoomForm.invalid) {
      return;
  }
  //True if all the fields are filled
  if(this.submitted)
  {
    alert("Great!!");
  }

}




}


