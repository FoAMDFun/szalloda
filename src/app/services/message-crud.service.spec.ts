import { TestBed } from '@angular/core/testing';

import { MessageCrudService } from './message-crud.service';

describe('MessageCrudService', () => {
  let service: MessageCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
