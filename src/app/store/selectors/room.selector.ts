import { createSelector } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';
import { RoomState } from '../reducers/room.reducer';

export const roomSelector = createSelector(
  (state: RoomState) => state.rooms.items,
  (rooms: ReadonlyArray<Room>) => rooms
);
