import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifParamModelComponentImpl } from './modif-param-model.component';

describe('ModifParamModelComponent', () => {
  let component: ModifParamModelComponentImpl;
  let fixture: ComponentFixture<ModifParamModelComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifParamModelComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifParamModelComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
