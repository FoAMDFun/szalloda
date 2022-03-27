import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FileUpload } from 'src/app/models/fileupload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class RoomStorageService {
  private storage = getStorage();
  private metadata = {contentType: 'image/jpeg'};
  private basePath = '/rooms';
  public readonly imgSrc$:Subject<string | StorageError> = new Subject<string | StorageError>()

  constructor() { }

  pushFileToStorage(fileUpload: FileUpload):void {

    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, fileUpload.file, this.metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      (error) => {this.imgSrc$.next(error)},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          this.imgSrc$.next(downloadURL)
        });
      })
  }

}
