import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationItemComponent } from './visualization-item.component';

describe('VisualizationItemComponent', () => {
  let component: VisualizationItemComponent;
  let fixture: ComponentFixture<VisualizationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
