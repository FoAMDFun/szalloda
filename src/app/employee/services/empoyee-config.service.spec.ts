import { TestBed } from '@angular/core/testing';

import { EmpoyeeConfigService } from './empoyee-config.service';

describe('EmpoyeeConfigService', () => {
  let service: EmpoyeeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpoyeeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
