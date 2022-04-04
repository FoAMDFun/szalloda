import { createAction } from "@ngrx/store";
import { Message } from "src/app/models/message.model";

export const GET_MESSAGES = '[MESSAGE] Get all';
export const GET_MESSAGES_SUCCESS = '[MESSAGE] Get all success';
export const GET_MESSAGES_ERROR = '[MESSAGE] Get all error';
export const ADD_MESSAGE = '[MESSAGE] Add';
export const ADD_MESSAGE_SUCCESS = '[MESSAGE] Add success';
export const ADD_MESSAGE_ERROR = '[MESSAGE] Add error';
export const DELETE_MESSAGE = '[MESSAGE] Delete';
export const DELETE_MESSAGE_SUCCESS = '[MESSAGE] Delete success';
export const DELETE_MESSAGE_ERROR = '[MESSAGE] Delete error';
export const UPDATE_MESSAGE = '[MESSAGE] Update';
export const UPDATE_MESSAGE_SUCCESS = '[MESSAGE] Update success';
export const UPDATE_MESSAGE_ERROR = '[MESSAGE] Update error';


export const getMessages = createAction(GET_MESSAGES);
export const getMessagesSuccess = createAction(GET_MESSAGES_SUCCESS,(messages: ReadonlyArray<Message>) => ({ messages }));
export const getMessagesError = createAction(GET_MESSAGES_ERROR,(error: any) => ({ error }));

export const addMessage= createAction(ADD_MESSAGE,(message: Message) => ({ message }));
export const addMessageSuccess = createAction(ADD_MESSAGE_SUCCESS,(message: Message) => ({ message }));
export const addMessageError = createAction(ADD_MESSAGE_ERROR,(error: any) => ({ error }));

export const deleteMessage = createAction(DELETE_MESSAGE,(message: Message) => ({ message }));
export const deleteMessageSuccess = createAction(DELETE_MESSAGE_SUCCESS);
export const deleteMessageError = createAction(DELETE_MESSAGE_ERROR,(message: Message) => ({ message }));

export const updateMessage = createAction(UPDATE_MESSAGE,(message: Message) => ({ message }));
export const updateMessageSuccess = createAction(UPDATE_MESSAGE_SUCCESS);
export const updateMessageError = createAction(UPDATE_MESSAGE_ERROR,(message: Message) => ({ message }));

