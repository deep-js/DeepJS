import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONModelComponentImpl } from './json-model.component';

describe('JSONModelComponentImpl', () => {
  let component: JSONModelComponentImpl;
  let fixture: ComponentFixture<JSONModelComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONModelComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONModelComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
