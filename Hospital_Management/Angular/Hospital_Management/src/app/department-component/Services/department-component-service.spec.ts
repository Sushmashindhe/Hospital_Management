import { TestBed } from '@angular/core/testing';

import { DepartmentComponentService } from './department-component-service';

describe('DepartmentComponentService', () => {
  let service: DepartmentComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
