import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DomState } from '../reducers/dom.reducer';

export const getDomState = createFeatureSelector<DomState>('dom');

export const getScrolledSelector = createSelector(
  getDomState,
  (state: DomState) => state.isScrolled
);
