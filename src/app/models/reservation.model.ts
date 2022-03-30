// reservations table

import { Timestamp } from 'firebase/firestore';

export interface Reservation {
  _id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  customerId: string; // Userre mutat
  roomId: string | number; // szobára mutat
  numberOfCustomers: number;
  status?: ReservationStatus;
  comments?: string;
  personsId?: string[];
}

export enum ReservationStatus {
  UNCONFIRMED,
  CONFIRMED,
  RESIDENT,
  ALREADY_GONE,
}
