import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  Firestore,
  setDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { defer, from, Observable, pipe, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  collName = 'users';
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, this.collName);
    return (collectionData(usersRef, { idField: '_id' }) as Observable<User[]>).pipe(tap(x => console.log(x)));
  }

  getUser(id: string): Observable<User> {
    const itemDoc = doc(this.firestore, `${this.collName}/${id}`);
    return <Observable<User>>docData(itemDoc, { idField: '_id' });
  }

  async getUserID(email: string): Promise<string> {
    const q = query(
      collection(this.firestore, 'users'),
      where('email', '==', email)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].id;
  }

  getUserWithFilter(
    filterField: string,
    filterTerm: string | number
  ): Observable<User[]> {
    const collectionRef = collection(this.firestore, this.collName);
    const searchRef = query(
      collectionRef,
      where(filterField, '==', filterTerm)
    );
    return collectionData(searchRef) as Observable<User[]>;
  }

  addUser(user: User): Observable<any> {
    const usersRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(usersRef, user)));
  }

  deleteUser(user: User): Observable<any> {
    const userDocRef = doc(this.firestore, `${this.collName}/${user._id}`);
    return defer(() => from(deleteDoc(userDocRef)));
  }

  updateUser(user: User): Observable<any> {
    const userDocRef = doc(this.firestore, `${this.collName}/${user._id}`);
    return defer(() => from(setDoc(userDocRef, user)));
  }
}
