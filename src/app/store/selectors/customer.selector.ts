import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { CustomerState } from '../reducers/customer.reducer';

export const getCustomerState = createFeatureSelector<CustomerState>('customer');

export const getCustomersSelector = createSelector(
  getCustomerState,
  (state: CustomerState) => state.items
);
export const getCustomerByIdSelector = (id: string)  => createSelector(
  getCustomerState,
  (state: CustomerState) => state.items.find(item => item._id === id)
);
export const getCustomerIdByCustomer = (customer: Customer)  => createSelector(
  getCustomerState,
  (state: CustomerState) => state.items.find(item => {
    const c= customer as any;
    const i = item as any;
    let result = true;
    for(let keys of Object.keys(customer)){
      if (i[keys] !== c[keys] && keys !== '_id') {
        result = false;
      }
    }
    return result
  }
  )?._id
);

