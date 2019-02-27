import { Component, ViewChild, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(){
    // tfjs@0.15.2 throws 10 warnings per batch during training, significantly slowing down browser debugging ui
    // disabling them
    tf.disableDeprecationWarnings();
  }

  ngOnInit() {
  }



}

