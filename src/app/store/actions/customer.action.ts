import { createAction } from "@ngrx/store";
import { Customer } from "src/app/models/customer.model";

export const GET_CUSTOMERS = '[CUSTOMER] Get all';
export const GET_CUSTOMERS_SUCCESS = '[CUSTOMER] Get all success';
export const GET_CUSTOMERS_ERROR = '[CUSTOMER] Get all error';
export const ADD_CUSTOMER = '[CUSTOMER] Add';
export const ADD_CUSTOMER_SUCCESS = '[CUSTOMER] Add success';
export const ADD_CUSTOMER_ERROR = '[CUSTOMER] Add error';
export const DELETE_CUSTOMER = '[CUSTOMER] Delete';
export const DELETE_CUSTOMER_SUCCESS = '[CUSTOMER] Delete success';
export const DELETE_CUSTOMER_ERROR = '[CUSTOMER] Delete error';
export const UPDATE_CUSTOMER = '[CUSTOMER] Update';
export const UPDATE_CUSTOMER_SUCCESS = '[CUSTOMER] Update success';
export const UPDATE_CUSTOMER_ERROR = '[CUSTOMER] Update error';


export const getCustomers = createAction(GET_CUSTOMERS);
export const getCustomersSuccess = createAction(GET_CUSTOMERS_SUCCESS,(customers: ReadonlyArray<Customer>) => ({ customers }));
export const getCustomersError = createAction(GET_CUSTOMERS_ERROR,(error: any) => ({ error }));

export const addCustomer= createAction(ADD_CUSTOMER,(customer: Customer) => ({ customer }));
export const addCustomerSuccess = createAction(ADD_CUSTOMER_SUCCESS,(customer: Customer) => ({ customer }));
export const addCustomerError = createAction(ADD_CUSTOMER_ERROR,(error: any) => ({ error }));

export const deleteCustomer = createAction(DELETE_CUSTOMER,(customer: Customer) => ({ customer }));
export const deleteCustomerSuccess = createAction(DELETE_CUSTOMER_SUCCESS);
export const deleteCustomerError = createAction(DELETE_CUSTOMER_ERROR,(customer: Customer) => ({ customer }));

export const updateCustomer = createAction(UPDATE_CUSTOMER,(customer: Customer) => ({ customer }));
export const updateCustomerSuccess = createAction(UPDATE_CUSTOMER_SUCCESS);
export const updateCustomerError = createAction(UPDATE_CUSTOMER_ERROR,(customer: Customer) => ({ customer }));

