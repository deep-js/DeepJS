import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsModelComponent } from './json-model.component';

describe('TsModelComponent', () => {
  let component: TsModelComponent;
  let fixture: ComponentFixture<TsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsModelComponent ]
    })
    .compileComponenjson();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
