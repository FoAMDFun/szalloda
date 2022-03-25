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

  getReservations(): Observable<ReadonlyArray<Reservation>> {
    const reservationsRef = collection(this.firestore, this.collName);
    return collectionData(reservationsRef, { idField: '_id' }) as Observable<
      Reservation[]
    >;
  }

  // getReservationsFilter(filter: ReservationFilter): Observable<Reservation[]> {
  //   const collectionRef = collection(this.firestore, this.collName);
  //   const searchRef = query(
  //     collectionRef,
  //     where('startDate', '>=', Timestamp.fromDate(filter.startDate)),
  //     where('endDate', '<=', Timestamp.fromDate(filter.endDate))
  //   );
  //   return collectionData(searchRef) as Observable<Reservation[]>;
  // }

  addReservation(reservation: Reservation): Observable<any> {
    const reservationRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(reservationRef, reservation)));
  }

  deleteReservation(reservationID: string): Observable<void> {
    const reservationRef = doc(
      this.firestore,
      `${this.collName}/${reservationID}`
    );
    return defer(() => from(deleteDoc(reservationRef)));
  }
}
