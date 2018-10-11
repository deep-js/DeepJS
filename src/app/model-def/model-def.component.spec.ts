import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDefComponent } from './model-def.component';

describe('ModelDefComponent', () => {
  let component: ModelDefComponent;
  let fixture: ComponentFixture<ModelDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
