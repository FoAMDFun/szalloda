import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
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
  updateRoom,
  updateRoomSuccess,
  updateRoomError,
} from '../actions/room.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RoomEffects {
  getRooms$ = createEffect(() =>
    this.action$.pipe(
      ofType(getRooms),
      exhaustMap(() =>
        this.roomCrudService.getRooms().pipe(
          map((rooms: ReadonlyArray<Room>) => getRoomsSuccess(rooms)),
          catchError((error) => {
            this.toastr.error(
              `A szobák lekérése sikertelen!, hibaüzenet: ${error.message}`
            );
            return of(getRoomsError(error));
          })
        )
      )
    )
  );

  addRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(addRoom),
      concatMap(({ room }) =>
        this.roomCrudService.addRoom(room).pipe(
          map(() => {
            this.toastr.success('A szoba mentés sikeres');
            return addRoomSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A szoba mentés sikertelen! hibaüzenet: ${error.message}`
            );
            return of(addRoomError(error));
          })
        )
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteRoom),
      mergeMap(({ room }) =>
        this.roomCrudService.deleteRoom(room).pipe(
          map(() => {
            this.toastr.success('A szoba törlés sikeres');
            return deleteRoomSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A szoba törlés nem sikerült! hibaüzenet: ${error.message}`
            );
            return of(deleteRoomError(error));
          })
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateRoom),
      concatMap(({ room }) =>
        this.roomCrudService.updateRoom(room).pipe(
          map(() => {
            this.toastr.success('A szoba felülírás sikeres');
            return updateRoomSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A szoba felülírás sikertelen! hibaüzenet: ${error.message}`
            );
            return of(updateRoomError(error));
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private roomCrudService: RoomCrudService,
    private toastr: ToastrService
  ) {}
}
//
