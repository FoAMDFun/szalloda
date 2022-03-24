import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import {
  deleteRoom,
  getRoomsError,
  getRoomsSuccess,
} from '../actions/room.action';


export interface RoomState {
  rooms: {
    items: ReadonlyArray<Room>;
    error: any;
  };
}
const initialState: RoomState = {
  rooms: {
    items: [],
    error: null,
  },
};

export const RoomReducer = createReducer(
  initialState.rooms,
  on(getRoomsSuccess, (state, { rooms }) => ({
    ...state,
    items: [...rooms],
  })),
  on(getRoomsError, (state, error) => ({
    ...state,
    error: error,
  })),
  on(deleteRoom, (state, { room }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== room._id),
  }))
  // on(addRoomSuccess, (state) => [...state])
);
