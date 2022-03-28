import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import {
  addRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getRoomsSelector } from 'src/app/store/selectors/room.selector';
import {
  IconDefinition,
  faImage,
  faTrashAlt,
  faEdit,
  faStar,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { map, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomStorageService } from '../../services/room-storage.service';
import { FileUpload } from 'src/app/models/fileupload';

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

  private selectedFiles?: FileList;
  public currentFileUpload?: FileUpload;
  private imgSrcSub: Subscription = new Subscription();

  public selectedDeleteRoom?: Room;

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

  private lastFormValue: { room: Room | undefined; isUpdating: boolean } = {
    room: undefined,
    isUpdating: false,
  };
  public roomForm: FormGroup = this.fb.group({
    bed: ['', [Validators.required, Validators.min(0)]],
    numberOf: ['', [Validators.required]],
    floor: ['', [Validators.required]],
    isBalcony: [false],
    image: [''],
    imageSrc: [''],
    // reviews: ['', [Validators.required]],
  });
  get formControlls() {
    return this.roomForm.controls;
  }

  constructor(
    private store: Store<RoomState>,
    private fb: FormBuilder,
    private roomStorageService: RoomStorageService
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.imgSrcSub = this.roomStorageService.imgSrc$.subscribe((x) => {
      if (typeof x === 'string') {
        this.roomForm.get('imageSrc')?.setValue(x);
      } else {
        // feltöltési hiba
      }
    });
  }
  ngOnDestroy(): void {
    this.imgSrcSub.unsubscribe();
  }

  private getRooms(): void {
    this.store.dispatch(getRooms());
  }

  setDeleteRoom(room: Room) {
    this.selectedDeleteRoom = room;
  }

  public newRandomRoom(): void {
    function getRandomString(): string {
      return btoa(Math.random().toString()).substr(10, 15);
    }
    const dummyRoom: Room = {
      floor: Math.floor(Math.random() * 100),
      bed: Math.floor(Math.random() * 100),
      imageSrc: getRandomString(),
      numberOf: Math.floor(Math.random() * 100),
      _id: getRandomString(),
      reviews: [],
      isBalcony: Math.floor(Math.random() * 100) % 2 === 0,
    };
    this.store.dispatch(addRoom(dummyRoom));
  }

  public deleteRoom(): void {
    if (this.selectedDeleteRoom) {
      this.store.dispatch(deleteRoom(this.selectedDeleteRoom)); //törölni kéne a képeket is ha már nem használja senki
      // a deleteRoom dispatch-elhet egy deletePictures-t is a props pedig a képek linktömbje
    }
  }

  public editRoom(room: Room): void {
    this.roomForm.setValue({
      bed: room.bed,
      numberOf: room.numberOf,
      floor: room.floor,
      isBalcony: room.isBalcony,
      imageSrc: room.imageSrc,
      image: '',
    });
    this.lastFormValue = { room: room, isUpdating: true };
  }

  public saveRoom(): void {
    if (this.lastFormValue.isUpdating && this.lastFormValue.room) {
      const updatedRoom: Room = {
        ...this.lastFormValue.room, // ID miatt
        bed: this.roomForm.value.bed,
        numberOf: this.roomForm.value.numberOf,
        floor: this.roomForm.value.floor,
        isBalcony: this.roomForm.value.isBalcony,
        imageSrc: this.roomForm.value.imageSrc,
      };
      this.store.dispatch(updateRoom(updatedRoom)); // review ekre még gondolni kell
    } else {
      this.store.dispatch(addRoom(this.roomForm.value));
    }
    // mentés sikeres? sikertelen? stb???.... TODO //felugorhatna ilyen ablak jobb felül zölden hogy sikeres vagy sikertelen
    this.roomForm.reset();
    this.lastFormValue = { room: undefined, isUpdating: false };
  }

  public newRoom(): void {
    if (this.lastFormValue.isUpdating) {
      this.roomForm.reset();
    }
    this.lastFormValue.isUpdating = false;
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public upload(): void {
    const file = this.selectedFiles?.item(0);
    if (!file) {
      return;
    }
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.roomStorageService.pushFileToStorage(this.currentFileUpload);
  }
}
