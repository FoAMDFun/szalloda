import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from '../reducers/room.reducer';

export const getRoomState = createFeatureSelector<RoomState>('room');

export const getRoomsSelector = createSelector(
  getRoomState,
  (state: RoomState) => state.items
);

// export const getRoomIsExistsSelector = (room: Room)  => createSelector(
//   getRoomState,
//   (state: RoomState) =>
//   state.items.findIndex(r=> room.numberOf===r.numberOf &&  room.floor===r.floor)!==-1
// );

export const getRoomByIdSelector = (roomId: string) => createSelector(
  getRoomState,
  (state: RoomState) => state.items.find(r => r._id === roomId)
);

export const getCurrentRoomAddRoomAndCRUDMode = createSelector(
  getRoomState,
  (state:RoomState) => {
    return {
    currentRoom: state.currentRoom,
    newRoom: state.newRoom,
    crudMode: state.crudMode,
    }
  }
)

export const getCurrentRoomSelector = createSelector(
  getRoomState,
  (state: RoomState) => state.currentRoom
);
