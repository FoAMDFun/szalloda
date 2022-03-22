import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { defer, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationCrudService {
  collName = 'reservations';
  constructor(private firestore: Firestore) {}

  getReservations(): Observable<ReadonlyArray<Reservation>> {
    console.log('getReservations in service');
    const reservationsRef = collection(this.firestore, this.collName);
    return collectionData(reservationsRef, { idField: '_id' }) as Observable<
      Reservation[]
    >;
  }

  addReservation(reservation: Reservation): Observable<any> {
    const reservationRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(reservationRef, reservation)));
  }

  deleteReservation(reservation: Reservation): Observable<void>{
    const reservationRef = doc(this.firestore, `${this.collName}/${reservation._id}`);
    return defer(() => from(deleteDoc(reservationRef)));
  }
}
