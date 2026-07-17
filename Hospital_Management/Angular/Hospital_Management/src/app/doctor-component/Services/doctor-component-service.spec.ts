import { TestBed } from '@angular/core/testing';

import { DoctorComponentService } from './doctor-component-service';

describe('DoctorComponentService', () => {
  let service: DoctorComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
