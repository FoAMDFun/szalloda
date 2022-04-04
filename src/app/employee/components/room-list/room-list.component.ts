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
import { map, Subscription } from 'rxjs';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomStorageService } from '../../services/room-storage.service';
import { FileUpload } from 'src/app/models/fileupload';
import { integerValidator } from 'src/app/validators/integer.validator';
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
  private readonly controllsValue:any = {bed:"Az ágyak ",numberOf:"A szobaszám ",floor:"Az emelet "}
  private readonly validatorTypes:{pattern:string,maxlength:string,min:string,max:string,required:string,requiredNumber:string,integerError:string} =
  {pattern:"tartalmaz nem megfelelő karaktert",maxlength:"mező maximum karaktereinek a száma ",integerError:'csak egész értéket vehet fel',min:"nem lehet kevesebb mint ",max:"nem lehet nagyobb mint ",required:"megadása kötelező",requiredNumber:"megadása kötelező és csak számokat tartalmazhat"}
  readonly validatorValue:any ={floormaxlength:4,bedMin:1,bedMax:20,numberOfMin:1,numberOfMax:1100,floorMin:1,floorMax:10};
  public roomForm: FormGroup = this.fb.group({
    bed: ['', [integerValidator,Validators.required, Validators.min(this.validatorValue.bedMin),Validators.max(this.validatorValue.bedMax)]],
    numberOf: ['', [integerValidator,Validators.required,Validators.min(this.validatorValue.numberOfMin),Validators.max(this.validatorValue.numberOfMax)]],
    floor: ['', [Validators.pattern("[A-Za-z0-9_öÖüÜóÓőŐúÚéÉáÁűŰ\,\./ +-]*"),integerValidator,Validators.required,Validators.maxLength(this.validatorValue.floormaxlength),Validators.min(this.validatorValue.floorMin),Validators.max(this.validatorValue.floorMax)]],
    isBalcony: [false],
    image: [''],
    imageSrc: [''],
    // reviews: ['', [Validators.required]],
  });
  get formControls() {
    return this.roomForm.controls;
  }


  constructor(
    private store: Store<RoomState>,
    private fb: FormBuilder,
    private roomStorageService: RoomStorageService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getRooms());
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

  public setDeleteRoom(room: Room):void{
    this.selectedDeleteRoom = room;
  }

  public getErrorMessage(controllsValue: string,inputType: string): string {
    const error = this.formControls[controllsValue].errors as any;
    let validationText:string = ''
    if(error['integerError']){
      validationText = this.validatorTypes['integerError']
    }else if (error['min']) {
      validationText = this.validatorTypes['min'] + this.validatorValue[controllsValue+'Min']
    }else if (error['max']) {
      validationText = this.validatorTypes['max'] + this.validatorValue[controllsValue+'Max']
    }else if (error['maxlength']) {
      validationText = this.validatorTypes['maxlength'] + this.validatorValue[controllsValue+'maxlength']
    }else if (error['pattern']) {
      validationText = this.validatorTypes['pattern'];
    } else if (error['required']) {
      if (inputType === 'number') {
        validationText = this.validatorTypes['requiredNumber']
      }else{
        validationText = this.validatorTypes['required']
      }
    }
    return this.controllsValue[controllsValue] + validationText
  }

  public deleteRoom(): void {
    if (this.selectedDeleteRoom) {
      this.store.dispatch(deleteRoom(this.selectedDeleteRoom));
      //törölni kéne a képeket is ha már nem használja senki
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
      this.store.dispatch(addRoom(this.roomForm.value))
    }
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
