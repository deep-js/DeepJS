import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochVisualizationComponent } from './epoch-visualisation.component';

describe('EpochVisualizationComponent', () => {
  let component: EpochVisualizationComponent;
  let fixture: ComponentFixture<EpochVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
