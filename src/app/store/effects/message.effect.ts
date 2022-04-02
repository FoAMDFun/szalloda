import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { MessageCrudService } from 'src/app/services/message-crud.service';
import { addMessage, addMessageError, addMessageSuccess, deleteMessage, deleteMessageError, deleteMessageSuccess, getMessages, getMessagesError, getMessagesSuccess, updateMessage, updateMessageError, updateMessageSuccess } from '../actions/message.action';
import { Message } from 'src/app/models/message.model';
import { MessageState } from '../reducers/message.reducer';

@Injectable()
export class MessageEffects {
  getMessages$ = createEffect(() =>
    this.action$.pipe(
      ofType(getMessages),
      exhaustMap(() =>
        this.messageCrudService.getMessages().pipe(
          map((messages: ReadonlyArray<Message>) => getMessagesSuccess(messages)),
          catchError((error) => {
            this.toastr.error(
              `A személyek lekérése sikertelen!, hibaüzenet: ${error.message}`
            );
            return of(getMessagesError(error));
          })
        )
      )
    )
  );

  addMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(addMessage),
      concatMap(({message}) =>
          this.messageCrudService.addMessage(message).pipe(
            map(() => {
              this.toastr.success('A személy mentés sikeres');
              return addMessageSuccess(message);
            }),
            catchError((error) => {
              this.toastr.error(
                `A személy mentés sikertelen! hibaüzenet: ${error.message}`
              );
              return of(addMessageError(error));
            })
          )


      )
    )
  );

  deleteMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteMessage),
      mergeMap(({ message }) =>
        this.messageCrudService.deleteMessage(message).pipe(
          map(() => {
            this.toastr.success('A személy törlés sikeres');
            return deleteMessageSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A személy törlés nem sikerült! hibaüzenet: ${error.message}`
            );
            return of(deleteMessageError(error));
          })
        )
      )
    )
  );

  updateMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateMessage),
      concatMap(({ message }) =>
        this.messageCrudService.updateMessage(message).pipe(
          map(() => {
            this.toastr.success('A személy felülírás sikeres');
            return updateMessageSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A személy felülírás sikertelen! hibaüzenet: ${error.message}`
            );
            return of(updateMessageError(error));
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private messageCrudService: MessageCrudService,
    private toastr: ToastrService,
    private store: Store<MessageState>,
  ) {}
}
