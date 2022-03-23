import { RoomReview } from "./roomreview.model";

export interface Room{
  _id?: string;
  numberOf:number;
  bed:number;
  reviews:RoomReview[];

  image?:string;
}
