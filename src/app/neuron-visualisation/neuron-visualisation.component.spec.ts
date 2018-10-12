import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuronVisualisationComponent } from './neuron-visualisation.component';

describe('NeuronVisualisationComponent', () => {
  let component: NeuronVisualisationComponent;
  let fixture: ComponentFixture<NeuronVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuronVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuronVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
