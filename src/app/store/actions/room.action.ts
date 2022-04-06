import { createAction } from '@ngrx/store';
import { CRUDMode } from 'src/app/models/mode.models';
import { Room } from 'src/app/models/room.model';

export const GET_ROOMS = '[ROOM] Get all';
export const GET_ROOMS_SUCCESS = '[ROOM] Get all success';
export const GET_ROOMS_ERROR = '[ROOM] Get all error';
export const ADD_ROOM = '[ROOM] Add';
export const ADD_ROOM_IF_NOT_EXISTS = '[ROOM] Add if not exists';
export const ADD_ROOM_SUCCESS = '[ROOM] Add success';
export const ADD_ROOM_ERROR = '[ROOM] Add error';
export const DELETE_ROOM = '[ROOM] Delete';
export const DELETE_ROOM_SUCCESS = '[ROOM] Delete success';
export const DELETE_ROOM_ERROR = '[ROOM] Delete error';
export const UPDATE_ROOM = '[ROOM] Update';
export const UPDATE_ROOM_SUCCESS = '[ROOM] Update success';
export const UPDATE_ROOM_ERROR = '[ROOM] Update error';
export const SET_CURRENT_ROOM = '[ROOM] Set currentRoom';
export const CLEAR_CURRENT_ROOM = '[ROOM] Clear currentRoom';
export const SET_NEW_ROOM = '[ROOM] Set newRoom';
export const CLEAR_NEW_ROOM = '[ROOM] Clear newRoom';
export const SET_CRUD_MODE = '[ROOM] Set crudMode';
export const CLEAR_CRUD_MODE = '[ROOM] Clear crudMode';

export const getRooms = createAction(GET_ROOMS);
export const getRoomsSuccess = createAction(GET_ROOMS_SUCCESS,(rooms: ReadonlyArray<Room>) => ({ rooms }));
export const getRoomsError = createAction(GET_ROOMS_ERROR,(error: any) => ({ error }));

export const addRoom= createAction(ADD_ROOM,(room: Room) => ({ room }));
export const addRoomIfNotExists= createAction(ADD_ROOM_IF_NOT_EXISTS,(room: Room) => ({ room }));
export const addRoomSuccess = createAction(ADD_ROOM_SUCCESS, (room: Room) => ({ room }));
export const addRoomError = createAction(ADD_ROOM_ERROR,(error: any) => ({ error }));

export const deleteRoom = createAction(DELETE_ROOM);
export const deleteRoomSuccess = createAction(DELETE_ROOM_SUCCESS);
export const deleteRoomError = createAction(DELETE_ROOM_ERROR,(error: any) => ({ error }));

export const updateRoom = createAction(UPDATE_ROOM,(room: Room) => ({ room }));
export const updateRoomSuccess = createAction(UPDATE_ROOM_SUCCESS, (room: Room) => ({ room }));
export const updateRoomError = createAction(UPDATE_ROOM_ERROR,(error: any) => ({ error }));

export const setCurrentRoom = createAction(SET_CURRENT_ROOM,(room: Room) => ({ room }));
export const clearCurrentRoom = createAction(CLEAR_CURRENT_ROOM);
export const setNewRoom = createAction(SET_NEW_ROOM,(room: Room) => ({ room }));
export const clearNewRoom = createAction(CLEAR_NEW_ROOM)
export const setCrudMode = createAction(SET_CRUD_MODE,(crudMode: CRUDMode) => ({ crudMode }));
export const clearCrudMode = createAction(CLEAR_CRUD_MODE);
