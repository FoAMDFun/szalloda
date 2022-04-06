import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable, Subscription } from 'rxjs';
import { FileUpload } from 'src/app/models/fileupload';
import { CRUDMode } from 'src/app/models/mode.models';
import { Room } from 'src/app/models/room.model';
import { addRoom, clearNewRoom, getRooms, setNewRoom, updateRoom } from 'src/app/store/actions/room.action';
import { RoomState } from 'src/app/store/reducers/room.reducer';
import { getCurrentRoomAddRoomAndCRUDMode } from 'src/app/store/selectors/room.selector';
import { integerValidator } from 'src/app/validators/integer.validator';
import { RoomStorageService } from '../../services/room-storage.service';
import { clearCurrentRoom } from '../../../store/actions/room.action';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.scss']
})
export class AddRoomModalComponent implements OnInit {

  private selectedFiles?: FileList;
  public currentFileUpload?: FileUpload;
  private imgSrcSub: Subscription = new Subscription();
  private readonly controllsValue:any = {bed:"Az ágyak ",numberOf:"A szobaszám ",floor:"Az emelet "}
  private readonly validatorTypes:{pattern:string,maxlength:string,min:string,max:string,required:string,requiredNumber:string,integerError:string} =
  {pattern:"tartalmaz nem megfelelő karaktert",maxlength:"mező maximum karaktereinek a száma ",integerError:'csak egész értéket vehet fel',min:"nem lehet kevesebb mint ",max:"nem lehet nagyobb mint ",required:"megadása kötelező",requiredNumber:"megadása kötelező és csak számokat tartalmazhat"}
  readonly validatorValue:any ={floormaxlength:4,bedMin:1,bedMax:20,numberOfMin:1,numberOfMax:1100,floorMin:1,floorMax:10};

  private selectedRoomData?: Observable<{ currentRoom: Room | null; newRoom: Room | null; crudMode: CRUDMode | null }> =
  this.store.pipe(select(getCurrentRoomAddRoomAndCRUDMode));
  private currentCRUDMode: CRUDMode|null =null

  constructor( private fb: FormBuilder,
    private roomStorageService: RoomStorageService,
    private store: Store<RoomState>,
    public modalRef: MdbModalRef<AddRoomModalComponent>,
    ) { }

  ngOnDestroy(): void {
    this.imgSrcSub.unsubscribe();
    this.close()
  }

  ngOnInit(): void {
    this.store.dispatch(getRooms());
    this.imgSrcSub = this.roomStorageService.imgSrc$.subscribe((x) => {
      if (typeof x === 'string') {
        this.roomForm.get('imageSrc')?.setValue(x);
      } else {
        // feltöltési hiba
      }
    });
    this.selectedRoomData?.subscribe(data => {
      this.currentCRUDMode=data.crudMode
    if (data.crudMode===CRUDMode.UPDATE && data.currentRoom !==null) {
      this.roomForm.patchValue(data.currentRoom);
    }
    if (data.crudMode===CRUDMode.CREATE && data.newRoom !==null) {
      this.roomForm.patchValue(data.newRoom);
    }})
  }
  public roomForm: FormGroup = this.fb.group({
    _id: ['',[]],
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

  public saveRoom(): void {
    if (this.currentCRUDMode===CRUDMode.CREATE) {
      this.store.dispatch(addRoom(this.roomForm.value))
      this.store.dispatch(clearNewRoom())
    }
    if (this.currentCRUDMode===CRUDMode.UPDATE) {
      this.store.dispatch(updateRoom(this.roomForm.value));
    }
    // this.roomForm.reset(); // reseteljen v ne? ez itt a kérdés, mert hibánál is resetel ha igen
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

  public close(): void {
    if (this.currentCRUDMode===CRUDMode.CREATE) {
      this.store.dispatch(setNewRoom(this.roomForm.value))
    }
    if (this.currentCRUDMode===CRUDMode.UPDATE) {
      this.store.dispatch(clearCurrentRoom())
    }
    this.modalRef.close()
  }
}
