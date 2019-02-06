import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochVisualisationComponent } from './epoch-visualisation.component';

describe('EpochVisualisationComponent', () => {
  let component: EpochVisualisationComponent;
  let fixture: ComponentFixture<EpochVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
