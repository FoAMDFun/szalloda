import { TestBed } from '@angular/core/testing';

import { CustomerCrudService } from './customer-crud.service';

describe('CustomerCrudService', () => {
  let service: CustomerCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
