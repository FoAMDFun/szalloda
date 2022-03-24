import { createAction } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';

export const GET_ROOMS = '[ROOM] Get all';
export const GET_ROOMS_SUCCESS = '[ROOM] Get all success';
export const GET_ROOMS_ERROR = '[ROOM] Get all error';
export const ADD_ROOM = '[ROOM] Add';
export const ADD_ROOM_SUCCESS = '[ROOM] Add success';
export const ADD_ROOM_ERROR = '[ROOM] Add error';
export const DELETE_ROOM = '[ROOM] Delete';
export const DELETE_ROOM_SUCCESS = '[ROOM] Delete success';
export const DELETE_ROOM_ERROR = '[ROOM] Delete error';

export const getRoom = createAction(GET_ROOMS);
export const getRoomsSuccess = createAction(GET_ROOMS_SUCCESS,(room: ReadonlyArray<Room>) => ({ room }));
export const getRoomsError = createAction(GET_ROOMS_ERROR,(error: any) => ({ error }));

export const addRoom= createAction(ADD_ROOM,(room: Room) => ({ room }));
export const addRoomSuccess = createAction(ADD_ROOM_SUCCESS);
export const addRoomError = createAction(ADD_ROOM_ERROR,(room: Room) => ({ room }));

export const deleteRoom = createAction(DELETE_ROOM,(room: Room) => ({ room }));
export const deleteRoomSuccess = createAction(DELETE_ROOM_SUCCESS);
export const deleteRoomError = createAction(DELETE_ROOM_ERROR,(room: Room) => ({ room }));



