import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponentImpl } from './demo.component';

describe('DemoComponentImpl', () => {
  let component: DemoComponentImpl;
  let fixture: ComponentFixture<DemoComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
