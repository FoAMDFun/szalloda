import { TestBed } from '@angular/core/testing';

import { ReservationCrudService } from './reservation-crud.service';

describe('ReservationCrudService', () => {
  let service: ReservationCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
