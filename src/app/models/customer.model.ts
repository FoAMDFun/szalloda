import { Timestamp } from 'firebase/firestore';

export interface Customer{
  _id?: string;
  nationality: string;
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Timestamp;
  email?: string;
}
