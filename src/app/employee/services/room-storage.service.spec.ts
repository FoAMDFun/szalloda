import { TestBed } from '@angular/core/testing';

import { RoomStorageService } from './room-storage.service';

describe('RoomStorageService', () => {
  let service: RoomStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
