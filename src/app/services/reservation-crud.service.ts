import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { defer, from, Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationCrudService {
  collName = 'reservations';
  constructor(private firestore: Firestore) {}

  public getReservations(): Observable<ReadonlyArray<Reservation>> {
    const reservationsRef = collection(this.firestore, this.collName);
    return collectionData(reservationsRef, { idField: '_id' }) as Observable<
      Reservation[]
    >;
  }

  public addReservation(reservation: Reservation): Observable<any> {
    const reservationRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(reservationRef, reservation)));
  }

  public deleteReservation(reservationID: string): Observable<void> {
    const reservationRef = doc(
      this.firestore,
      `${this.collName}/${reservationID}`
    );
    return defer(() => from(deleteDoc(reservationRef)));
  }
}
