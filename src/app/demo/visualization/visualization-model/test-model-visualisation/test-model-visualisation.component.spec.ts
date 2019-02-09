import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModelVisualizationComponent } from './test-model-visualisation.component';

describe('TestModelVisualizationComponent', () => {
  let component: TestModelVisualizationComponent;
  let fixture: ComponentFixture<TestModelVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModelVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModelVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
