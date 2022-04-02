import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, mergeMap} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { CustomerCrudService } from 'src/app/services/customer-crud.service';
import { Customer } from 'src/app/models/customer.model';
import { addCustomer, addCustomerError, addCustomerSuccess, deleteCustomer, deleteCustomerError, deleteCustomerSuccess, getCustomers, getCustomersError, getCustomersSuccess, updateCustomer, updateCustomerError, updateCustomerSuccess } from '../actions/customer.action';
import { CustomerState } from '../reducers/customer.reducer';

@Injectable()
export class RoomEffects {
  getCustomers$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCustomers),
      exhaustMap(() =>
        this.customerCrudService.getCustomers().pipe(
          map((customers: ReadonlyArray<Customer>) => getCustomersSuccess(customers)),
          catchError((error) => {
            this.toastr.error(
              `A személyek lekérése sikertelen!, hibaüzenet: ${error.message}`
            );
            return of(getCustomersError(error));
          })
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType(addCustomer),
      concatMap(({customer}) =>
          this.customerCrudService.addCustomer(customer).pipe(
            map(() => {
              this.toastr.success('A személy mentés sikeres');
              return addCustomerSuccess(customer);
            }),
            catchError((error) => {
              this.toastr.error(
                `A személy mentés sikertelen! hibaüzenet: ${error.message}`
              );
              return of(addCustomerError(error));
            })
          )


      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteCustomer),
      mergeMap(({ customer }) =>
        this.customerCrudService.deleteCustomer(customer).pipe(
          map(() => {
            this.toastr.success('A személy törlés sikeres');
            return deleteCustomerSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A személy törlés nem sikerült! hibaüzenet: ${error.message}`
            );
            return of(deleteCustomerError(error));
          })
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateCustomer),
      concatMap(({ customer }) =>
        this.customerCrudService.updateCustomer(customer).pipe(
          map(() => {
            this.toastr.success('A személy felülírás sikeres');
            return updateCustomerSuccess();
          }),
          catchError((error) => {
            this.toastr.error(
              `A személy felülírás sikertelen! hibaüzenet: ${error.message}`
            );
            return of(updateCustomerError(error));
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private customerCrudService: CustomerCrudService,
    private toastr: ToastrService,
    private store: Store<CustomerState>,
  ) {}
}
