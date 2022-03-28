import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import { RoomState } from '../reducers/room.reducer';

export const getRoomState = createFeatureSelector<RoomState>('room');

export const getRoomsSelector = createSelector(
  getRoomState,
  (state: RoomState) => state.items
);
