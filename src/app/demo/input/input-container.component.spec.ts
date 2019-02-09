import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainerComponentImpl } from './input-container.component';

describe('InputContainerComponentImpl', () => {
  let component: InputContainerComponentImpl;
  let fixture: ComponentFixture<InputContainerComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputContainerComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContainerComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
