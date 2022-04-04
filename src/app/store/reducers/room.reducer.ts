import { createReducer, on } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import * as RoomActions from '../actions/room.action';

export interface RoomState {
  items: ReadonlyArray<Room>;
  error: any;
}
const initialState: RoomState = {
  items: [],
  error: null,
};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.getRoomsSuccess, (state, { rooms }) => ({
    ...state,
    items: [...rooms],
  })),
  on(RoomActions.getRoomsError, (state, error) => ({
    ...state,
    error: error,
  })),
  on(RoomActions.deleteRoom, (state, { room }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== room._id),
  })),
  on(RoomActions.updateRoom, (state, { room }) => ({
    ...state,
    items: state.items.map((item) => (item?._id === room._id ? room : item)),
  })),
  on(RoomActions.addRoomSuccess, (state,{ room }) => ({
    ...state,
    items:[...state.items,room]
    })),
  on(RoomActions.addRoomError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
