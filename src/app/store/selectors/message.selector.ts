import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from '../reducers/message.reducer';

export const getMessageState = createFeatureSelector<MessageState>('message');

export const getMessagesSelector = createSelector(
  getMessageState,
  (state: MessageState) => state.items
);
