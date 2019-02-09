import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSModelComponentImpl } from './ts-model.component';

describe('TSModelComponentImpl', () => {
  let component: TSModelComponentImpl;
  let fixture: ComponentFixture<TSModelComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSModelComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSModelComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
