import { TestBed } from '@angular/core/testing';

import { AdminComponentService } from './admin-component-service';

describe('AdminComponentService', () => {
  let service: AdminComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
