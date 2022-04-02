import { Timestamp } from 'firebase/firestore';

export interface Message{
  _id:string;
  text:string;
  senderId:string;
  title:string;
  date:Timestamp;
  isReading:boolean;
}
