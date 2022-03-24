import { TestBed } from '@angular/core/testing';

import { RoomCrudService } from './room-crud.service';

describe('RoomCrudService', () => {
  let service: RoomCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
