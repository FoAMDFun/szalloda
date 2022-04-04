import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { Room } from 'src/app/models/room.model';
import { RoomCrudService } from 'src/app/services/room-crud.service';
import * as RoomActions from '../actions/room.action';
import * as RoomSelectors from '../selectors/room.selector';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RoomState } from '../reducers/room.reducer';

@Injectable()
export class RoomEffects {
  getRooms$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoomActions.getRooms),
      exhaustMap(() =>
        this.roomCrudService.getRooms().pipe(
          take(1),
          map((rooms: ReadonlyArray<Room>) => RoomActions.getRoomsSuccess(rooms)),
          catchError((error) => {
            this.toastr.error(
              `A szobák lekérése sikertelen!, hibaüzenet: ${error.message}`
            );
            return of(RoomActions.getRoomsError(error));
          })
        )
      )
    )
  );

  addRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoomActions.addRoom),
      withLatestFrom(this.store.select(RoomSelectors.getRoomsSelector)),
      concatMap(([item ,state]) =>{
        if (state.findIndex((r)=> item.room.numberOf===r.numberOf &&  item.room.floor===r.floor)!==-1) {
          this.toastr.error(
            `Szobaszám: ${item.room.numberOf}, Emelet: ${item.room.floor} már létező szoba!`,
          )
          return of(RoomActions.addRoomError("room already exists"));
        }else{
          return this.roomCrudService.addRoom(item.room).pipe(
            map(() => {
              this.toastr.success('A szoba mentés sikeres');
              return RoomActions.addRoomSuccess(item.room);
            }),
            catchError((error) => {
              this.toastr.error(
                `A szoba mentés sikertelen! hibaüzenet: ${error.message}`
              );
              return of(RoomActions.addRoomError(error));
            })
          )
        }
      }
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoomActions.deleteRoom),
      mergeMap(({ room }) =>
        this.roomCrudService.deleteRoom(room).pipe(
          map(() => {
            this.toastr.success('A szoba törlés sikeres');
            return RoomActions.deleteRoomSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A szoba törlés nem sikerült! hibaüzenet: ${error.message}`
            );
            return of(RoomActions.deleteRoomError(error));
          })
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoomActions.updateRoom),
      concatMap(({ room }) =>
        this.roomCrudService.updateRoom(room).pipe(
          map(() => {
            this.toastr.success('A szoba felülírás sikeres');
            return RoomActions.updateRoomSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A szoba felülírás sikertelen! hibaüzenet: ${error.message}`
            );
            return of(RoomActions.updateRoomError(error));
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
