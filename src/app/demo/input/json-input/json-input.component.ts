import { Component, OnInit } from '@angular/core';
import {JsonInputComponent} from '@api/core/demo/input/json-input';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponentImpl implements OnInit, JsonInputComponent {

  constructor() { }

  ngOnInit() {
  }

}
