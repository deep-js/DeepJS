import { Component, OnInit } from '@angular/core';
import { InputComponent } from '@api/core/demo/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponentImpl implements OnInit, InputComponent {

  constructor() { }

  ngOnInit() {
  }

}
