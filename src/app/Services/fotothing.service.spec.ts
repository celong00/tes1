import { TestBed } from '@angular/core/testing';

import { FotothingService } from './fotothing.service';

describe('FotothingService', () => {
  let service: FotothingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotothingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
