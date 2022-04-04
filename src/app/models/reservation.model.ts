import { Timestamp } from 'firebase/firestore';
export interface Reservation {
  _id: string;
  startDate: Timestamp;
  endDate: Timestamp;
  customerId: string; // AuthUserre mutat
  status:ReservationStatus;
  roomId: string | number; // szobára mutat
  numberOfCustomers: number;
  comments?: string;
  customersId?: string[];
}

export enum ReservationStatus {
  UNCONFIRMED,
  CONFIRMED,
  ALREADY_GONE,
  RESIDENT,
}
