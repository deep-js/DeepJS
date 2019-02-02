import { Component, OnInit } from '@angular/core';
import {JsonInputComponent} from '@api/core/demo/input/json-input';

import { isArray, isNumber } from 'util';
import * as tf from '@tensorflow/tfjs';
import { JsonInputPresenterImpl } from './json-input.presenter';
import { InputDataService } from 'src/app/shared/services/input-data/input-data.service';
import { InputDataServiceImpl } from 'src/app/shared/services/input-data/input-data.service';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponentImpl implements OnInit, JsonInputComponent {

  private str: string;
  private labelImportOK: string

  createInputData(): InputDataService {
    var json = JSON.parse(this.str);
    this.labelImportOK = "Dataset imported !";
    return new InputDataServiceImpl(tf.tensor(json["x"]), tf.tensor(json["y"]));
  }

  constructor() { }

  ngOnInit() {
  }

}
