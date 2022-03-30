// reservations table

import { Timestamp } from 'firebase/firestore';

export interface Reservation {
  _id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  customerId: string; // Userre mutat
  status:ReservationStatus;
  roomId: string | number; // szobára mutat
  numberOfCustomers: number;
  comments?: string;
  personsId?: string[];
}

export enum ReservationStatus {
  UNCONFIRMED,
  CONFIRMED,
  RESIDENT,
  ALREADY_GONE,
}
