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
