import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModelVisualisationComponent } from './test-model-visualisation.component';

describe('TestModelVisualisationComponent', () => {
  let component: TestModelVisualisationComponent;
  let fixture: ComponentFixture<TestModelVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModelVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModelVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
