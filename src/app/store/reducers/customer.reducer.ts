import { createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { addCustomer, addCustomerError, addCustomerSuccess, deleteCustomer, getCustomersError, getCustomersSuccess, updateCustomer } from '../actions/customer.action';

export interface CustomerState {
  items: ReadonlyArray<Customer>;
  error: any;
}
const initialState: CustomerState = {
  items: [],
  error: null,
};

export const roomReducer = createReducer(
  initialState,
  on(getCustomersSuccess, (state, { customers }) => ({
    ...state,
    items: [...customers],
  })),
  on(getCustomersError, (state, error) => ({
    ...state,
    error: error,
  })),
  on(deleteCustomer, (state, { customer }) => ({
    ...state,
    items: state.items.filter((item) => item?._id !== customer._id),
  })),
  on(updateCustomer, (state, { customer }) => ({
    ...state,
    items: state.items.map((item) => (item?._id === customer._id ? customer : item)),
  })),
  on(addCustomer, (state,{ customer }) => ({
    ...state
    })),
  on(addCustomerSuccess, (state,{ customer }) => ({
    ...state,
    items:[...state.items,customer]
    })),
  on(addCustomerError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
