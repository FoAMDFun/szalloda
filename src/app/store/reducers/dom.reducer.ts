import { createReducer, on } from '@ngrx/store';
import * as DomActions from '../actions/dom.action';

export interface DomState {
  isScrolled: boolean;
}

const initialState: DomState = {
  isScrolled: false,
};

export const domReducer = createReducer(
  initialState,
  on(DomActions.scrolledDown, (state) => ({
    ...state,
    isScrolled: true,
  })),
  on(DomActions.scrolledTop, (state) => ({
    ...state,
    isScrolled: false,
  }))
);
