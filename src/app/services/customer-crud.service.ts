import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { defer, from, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerCrudService {
  private readonly collName = 'customers';
  constructor(private firestore: Firestore) {}

  public getCustomers(): Observable<ReadonlyArray<Customer>> {
    const customerRef = collection(this.firestore, this.collName);
    return collectionData(customerRef, { idField: '_id' }) as Observable<Customer[]>;
  }

  public addCustomer(customer: Customer): Observable<any> {
    const customerRef = collection(this.firestore, this.collName);
    return defer(() => from(addDoc(customerRef, customer)));
  }

  public deleteCustomer(customer: Customer): Observable<void>{
    const customerRef = doc(this.firestore, `${this.collName}/${customer._id}`);
    return defer(() => from(deleteDoc(customerRef)));
  }

  public updateCustomer(customer: Customer): Observable<any>{
    const customerDocRef = doc(this.firestore, `${this.collName}/${customer._id}`);
    return defer(() => from(setDoc(customerDocRef, customer)));
  }
}
