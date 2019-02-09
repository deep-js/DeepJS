import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContainerComponentImpl } from './model-container.component';

describe('ModelContainerComponentImpl', () => {
  let component: ModelContainerComponentImpl;
  let fixture: ComponentFixture<ModelContainerComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContainerComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContainerComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
