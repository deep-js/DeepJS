import { TestBed } from '@angular/core/testing';

import { ModelTrainerService } from './model-trainer.service';

describe('ModelTrainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelTrainerService = TestBed.get(ModelTrainerService);
    expect(service).toBeTruthy();
  });
});
