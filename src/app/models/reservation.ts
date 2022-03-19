export interface Reservation{
  _id?: string;
  roomId: string;
  personsId: string[];
  start: Date;
  end: Date;
}
