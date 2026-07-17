import { TestBed } from '@angular/core/testing';

import { PatientComponentService } from './patient-component-service';

describe('PatientComponentService', () => {
  let service: PatientComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
