import { TestBed } from '@angular/core/testing';

import { ConceirgeServicesService } from './conceirge-services.service';

describe('ConceirgeServicesService', () => {
  let service: ConceirgeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceirgeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
