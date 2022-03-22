// reservations table

import { Timestamp } from 'firebase/firestore';

export interface Reservation {
  id?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  customer: string; // Userre mutat
  comments?: string;
}
