import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationContainerComponentImpl } from './visualization-container.component';

describe('VisualizationContainerComponentImpl', () => {
  let component: VisualizationContainerComponentImpl;
  let fixture: ComponentFixture<VisualizationContainerComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationContainerComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationContainerComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
