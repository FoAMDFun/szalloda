// reservations table

import { Timestamp } from 'firebase/firestore';

export interface Reservation {
  _id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  customerId: string; // Userre mutat
  roomId: string; // szobára mutat


  status?:ReservationStatus;
  comments?: string;
  personsId?: string[];
}

export enum ReservationStatus {
  UNCONFIRMED,CONFIRMED,RESIDENT,ALREADY_GONE
}
