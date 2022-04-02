import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';

export const getCustomerState = createFeatureSelector<CustomerState>('customer');

export const getCustomersSelector = createSelector(
  getCustomerState,
  (state: CustomerState) => state.items
);
