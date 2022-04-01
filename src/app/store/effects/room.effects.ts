import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  take,
  tap,
  withLatestFrom,
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
import { Store } from '@ngrx/store';
import { RoomState } from '../reducers/room.reducer';
import {  getRoomsSelector } from '../selectors/room.selector';

@Injectable()
export class RoomEffects {
  getRooms$ = createEffect(() =>
    this.action$.pipe(
      ofType(getRooms),
      exhaustMap(() =>
        this.roomCrudService.getRooms().pipe(
          // take(1),
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
      withLatestFrom(this.store.select(getRoomsSelector)),
      concatMap(([item ,state]) =>{
        if (state.findIndex((r)=> item.room.numberOf===r.numberOf &&  item.room.floor===r.floor)!==-1) {
          this.toastr.error(
            `Szobaszám: ${item.room.numberOf}, Emelet: ${item.room.floor} már létező szoba!`,
          )
          return of(addRoomError("room already exists"));
        }else{
          return this.roomCrudService.addRoom(item.room).pipe(
            map(() => {
              this.toastr.success('A szoba mentés sikeres');
              return addRoomSuccess(item.room);
            }),
            catchError((error) => {
              this.toastr.error(
                `A szoba mentés sikertelen! hibaüzenet: ${error.message}`
              );
              return of(addRoomError(error));
            })
          )
        }
      }
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
    private toastr: ToastrService,
    private store: Store<RoomState>,
  ) {}
}
//
