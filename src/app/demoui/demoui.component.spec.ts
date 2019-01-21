import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUI } from './demoui.component';

describe('DemoUI', () => {
  let component: DemoUI;
  let fixture: ComponentFixture<DemoUI>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoUI ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
