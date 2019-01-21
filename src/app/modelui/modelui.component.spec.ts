import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUI } from './modelui.component';

describe('ModelUI', () => {
  let component: ModelUI;
  let fixture: ComponentFixture<ModelUI>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelUI ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
