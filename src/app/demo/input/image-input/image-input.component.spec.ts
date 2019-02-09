import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputComponentImpl } from './image-input.component';

describe('ImageInputComponentImpl', () => {
  let component: ImageInputComponentImpl;
  let fixture: ComponentFixture<ImageInputComponentImpl>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInputComponentImpl ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponentImpl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
