import { Timestamp } from 'firebase/firestore';

export interface Massage{
  _id:string;
  text:string;
  senderId:string;
  title:string;
  date:Timestamp;
  isreading:boolean;
}
