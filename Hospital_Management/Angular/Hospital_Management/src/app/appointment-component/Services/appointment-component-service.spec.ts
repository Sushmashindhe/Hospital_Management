import { TestBed } from '@angular/core/testing';

import { AppointmentComponentService } from './appointment-component-service';

describe('AppointmentComponentService', () => {
  let service: AppointmentComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
