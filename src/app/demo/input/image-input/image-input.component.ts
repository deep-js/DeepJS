import { Component, OnInit } from '@angular/core';
import {ImageInputComponent} from '@api/core/demo/input/image-input';
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

  constructor() { }

  ngOnInit() {
  }

}
