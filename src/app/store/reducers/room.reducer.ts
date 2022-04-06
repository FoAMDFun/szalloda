import { createReducer, on } from '@ngrx/store';
import { CRUDMode } from 'src/app/models/mode.models';
import { Room } from 'src/app/models/room.model';
import * as RoomActions from '../actions/room.action';

export interface RoomState {
  items: ReadonlyArray<Room>;
  error: any;
  currentRoom: Room | null;
  newRoom: Room | null;
  crudMode: CRUDMode | null;
}
const initialState: RoomState = {
  items: [],
  error: null,
  currentRoom: null,
  newRoom: null,
  crudMode: null,
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
  on(RoomActions.deleteRoomSuccess, (state) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== state.currentRoom?._id),
  })),
  on(RoomActions.deleteRoomError, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(RoomActions.updateRoomSuccess, (state, { room }) => ({
    ...state,
    items: state.items.map((item) => (item?._id === room._id ? room : item)),
  })),
  on(RoomActions.updateRoomError, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(RoomActions.addRoomSuccess, (state,{ room }) => ({
    ...state,
    items:[...state.items,room]
    })),
  on(RoomActions.addRoomError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(RoomActions.setCurrentRoom, (state, { room }) => ({
    ...state,
    currentRoom: room
  })),
  on(RoomActions.clearCurrentRoom, (state) => ({
    ...state,
    currentRoom: null
  })),
  on(RoomActions.setNewRoom, (state, { room }) => ({
    ...state,
    newRoom: room
  })),
  on(RoomActions.clearNewRoom, (state) => ({
    ...state,
    newRoom: null
  })),
  on(RoomActions.setCrudMode, (state, { crudMode }) => ({
    ...state,
    crudMode:crudMode
  })),
  on(RoomActions.clearCrudMode, (state) => ({
    ...state,
    crudMode: null
  }))
);
