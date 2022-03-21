// reservations table

export interface Reservation {
  startDate: Date;
  endDate: Date;
  customer: string; // Userre mutat
  comments?: string;
}
