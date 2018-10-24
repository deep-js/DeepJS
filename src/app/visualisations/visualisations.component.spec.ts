import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationsComponent } from './visualisations.component';

describe('VisualisationsComponent', () => {
  let component: VisualisationsComponent;
  let fixture: ComponentFixture<VisualisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
