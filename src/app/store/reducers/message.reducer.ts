import { createReducer, on } from '@ngrx/store';
import { Message } from 'src/app/models/message.model';
import { addMessage, addMessageError, addMessageSuccess, deleteMessage, getMessagesError, getMessagesSuccess, updateMessage } from '../actions/message.action';

export interface MessageState {
  items: ReadonlyArray<Message>;
  error: any;
}
const initialState: MessageState = {
  items: [],
  error: null,
};

export const messageReducer = createReducer(
  initialState,
  on(getMessagesSuccess, (state, { messages }) => ({
    ...state,
    items: [...messages],
  })),
  on(getMessagesError, (state, error) => ({
    ...state,
    error: error,
  })),
  on(deleteMessage, (state, { message }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== message._id),
  })),
  on(updateMessage, (state, { message }) => ({
    ...state,
    items: state.items.map((item) => (item?._id === message._id ? message : item)),
  })),
  on(addMessage, (state,{ message }) => ({
    ...state
    })),
  on(addMessageSuccess, (state,{ message }) => ({
    ...state,
    items:[...state.items,message]
    })),
  on(addMessageError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
