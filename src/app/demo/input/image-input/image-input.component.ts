import { Component, OnInit } from '@angular/core';
import {ImageInputComponent, ImageInputPresenter} from '@api/core/demo/input/image-input';
import { InputPresenter } from '@api/core';
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

  constructor() { }

  ngOnInit() {
  }

  getPresenter():InputPresenter {
    return null;
  }
}
