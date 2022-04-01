import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { defer, from, Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomCrudService {
  private readonly collName = 'rooms';
  constructor(private firestore: Firestore) {}

  public getRooms(): Observable<ReadonlyArray<Room>> {
    const roomRef = collection(this.firestore, this.collName);
    return collectionData(roomRef, { idField: '_id' }) as Observable<Room[]>;
  }

  public addRoom(room: Room): Observable<any> {
    const roomRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(roomRef, room)));
  }

  public deleteRoom(room: Room): Observable<void>{
    const roomRef = doc(this.firestore, `${this.collName}/${room._id}`);
    return defer(() => from(deleteDoc(roomRef)));
  }

  public updateRoom(room: Room): Observable<any>{
    const roomDocRef = doc(this.firestore, `${this.collName}/${room._id}`);
    return defer(() => from(setDoc(roomDocRef, room)));
  }
}
