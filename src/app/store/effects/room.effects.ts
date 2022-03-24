import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { Room } from 'src/app/models/room.model';

import { RoomCrudService } from 'src/app/services/room-crud.service';
import {
  getRooms,
  getRoomsSuccess,
  getRoomsError,
  addRoom,
  addRoomSuccess,
  addRoomError,
  deleteRoom,
  deleteRoomSuccess,
  deleteRoomError,
} from '../actions/room.action';

@Injectable()
export class RoomEffects {
  getRooms$ = createEffect(() =>
    this.action$.pipe(
      ofType(getRooms),
      exhaustMap(() =>
        this.roomCrudService.getRooms().pipe(
          map((rooms: ReadonlyArray<Room>) =>
            getRoomsSuccess(rooms)
          ),
          catchError((error) => of(getRoomsError(error)))
        )
      )
    )
  );

  addRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(addRoom),
      concatMap(({ room }) =>
        this.roomCrudService.addRoom(room).pipe(
          map(() => addRoomSuccess()),
          catchError((error) => of(addRoomError(error)))
        )
      )
    )
  );


  deleteRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteRoom),
      mergeMap(({ room }) =>
        this.roomCrudService.deleteRoom(room).pipe(
          map(() => deleteRoomSuccess()),
          catchError((error) => of(deleteRoomError(error)))
        )
      )
    )
  )


  constructor(
    private action$: Actions,
    private roomCrudService: RoomCrudService
  ) {}
}
