import { TestBed } from '@angular/core/testing';

import { ServcompService } from './servcomp.service';

describe('ServcompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServcompService = TestBed.get(ServcompService);
    expect(service).toBeTruthy();
  });
});
