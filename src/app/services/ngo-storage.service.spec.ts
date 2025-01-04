import { TestBed } from '@angular/core/testing';

import { NgoStorageService } from './ngo-storage.service';

describe('NgoStorageService', () => {
  let service: NgoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
