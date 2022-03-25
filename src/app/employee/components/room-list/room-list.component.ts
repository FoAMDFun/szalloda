import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import { addRoom, deleteRoom, getRooms } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { roomSelector } from 'src/app/store/selectors/room.selector';
import { IconDefinition, faImage, faTrashAlt,faEdit, faStar, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { map, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public readonly icons:{true:IconDefinition,false:IconDefinition,img:IconDefinition,delete:IconDefinition,edit:IconDefinition,star:IconDefinition} =
  {true:faCheckCircle,false:faTimesCircle,img:faImage,delete:faTrashAlt,edit:faEdit,star: faStar}

  public rooms$ = this._store.pipe(select(roomSelector),map(rooms=>{
    const result = [];
    for (const room of rooms){
      result.push(room)
    }
    return result
  }))

  public roomForm: FormGroup = this._fb.group({
    bed: ['', [Validators.required,Validators.min(0)]],
    numberOf: ['', [Validators.required]],
    floor: ['', [Validators.required]],
    isBalcony: [false],
    // image: ['', [Validators.required]],
    // reviews: ['', [Validators.required]],
    });
  private lastFormValue:{room:Room |undefined,isUpdating:boolean} = {room:undefined,isUpdating:false}
  get formControlls() { return this.roomForm.controls; }

  constructor(private _store: Store<RoomState>,private  _fb : FormBuilder) {}


  ngOnInit(): void {
    this.getRooms();
  }


  getRooms(): void {
    this._store.dispatch(getRooms());
  }

  newRandomRoom(): void {
    function getRandomString(): string {
      return btoa(Math.random().toString()).substr(10, 15);
    }
    const dummyRoom: Room = {
      floor:Math.floor(Math.random() * 100),
      bed: Math.floor(Math.random() * 100),
      image: getRandomString(),
      numberOf: Math.floor(Math.random() * 100),
      _id: getRandomString(),
      reviews: [],
      isBalcony : Math.floor(Math.random() * 100)%2===0
    };
    this._store.dispatch(addRoom(dummyRoom));
  }


  public deleteRoom(room: Room): void {
    this._store.dispatch(deleteRoom( room ));
  }

  editRoom(room: Room):void {
    this.roomForm.setValue({bed:room.bed,numberOf:room.numberOf,floor:room.floor,isBalcony:room.isBalcony});
    this.lastFormValue.isUpdating=true;
  }


  saveRoom(): void {
    this._store.dispatch(addRoom(this.roomForm.value))
    // mentés sikeres? sikertelen? stb???.... TODO
    this.roomForm.reset()
    this.lastFormValue.room = undefined
  }

  newRoom():void{
    if (!this.lastFormValue.isUpdating) {
      this.lastFormValue.room=this.roomForm.value;
    }
    this.roomForm.reset()
    if (this.lastFormValue) {
      this.roomForm.setValue({bed:this.lastFormValue.room?.bed,numberOf:this.lastFormValue.room?.numberOf,floor:this.lastFormValue.room?.floor,isBalcony:this.lastFormValue.room?.isBalcony});
    }
    this.lastFormValue.isUpdating = false
  }
}


