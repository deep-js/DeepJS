import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonInputComponentImpl } from './json-input.component';

describe('JsonInputComponentImpl', () => {
  let component: JsonInputComponentImpl;
  let fixture: ComponentFixture<JsonInputComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonInputComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonInputComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
