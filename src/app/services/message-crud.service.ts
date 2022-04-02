import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { defer, from, Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageCrudService {

  private readonly collName = 'messages';
  constructor(private firestore: Firestore) {}

  public getMessages(): Observable<ReadonlyArray<Message>> {
    const messageRef = collection(this.firestore, this.collName);
    return collectionData(messageRef, { idField: '_id' }) as Observable<Message[]>;
  }

  public addMessage(message: Message): Observable<any> {
    const messageRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(messageRef, message)));
  }

  public deleteMessage(message: Message): Observable<void>{
    const messageRef = doc(this.firestore, `${this.collName}/${message._id}`);
    return defer(() => from(deleteDoc(messageRef)));
  }

  public updateMessage(message: Message): Observable<any>{
    const messageDocRef = doc(this.firestore, `${this.collName}/${message._id}`);
    return defer(() => from(setDoc(messageDocRef, message)));
  }
}
