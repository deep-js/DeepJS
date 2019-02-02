import { TestBed } from '@angular/core/testing';

import { InputDataServiceImpl } from './input-data.service';

describe('InputDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputDataServiceImpl = TestBed.get(InputDataServiceImpl);
    expect(service).toBeTruthy();
  });
});
