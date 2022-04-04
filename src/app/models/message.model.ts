import { Timestamp } from 'firebase/firestore';

export interface Message{
  _id:string;
  text:string;
  senderId:string;
  receiverId:string; // vagy egy flag ami jelzi hogy fogadta e vagy küldte a szálloda és ez alapján azonosítja a személy
  title:string;
  date:Timestamp;
  isRead:boolean;
}
