import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationItemComponentImpl } from './visualization-item.component';

describe('VisualizationItemComponentImpl', () => {
  let component: VisualizationItemComponentImpl;
  let fixture: ComponentFixture<VisualizationItemComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationItemComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationItemComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
