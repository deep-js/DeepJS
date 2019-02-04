import { Component, OnInit } from '@angular/core';
import {JsonInputComponent} from '@api/core/demo/input/json-input';
import { JsonInputPresenter } from '@api/core/demo/input/json-input/json-input.presenter'
import { JsonInputPresenterImpl } from './json-input.presenter';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponentImpl implements OnInit, JsonInputComponent {

  private str: string;
  private labelImportOK: string
  private presenter:JsonInputPresenter;

  constructor() { 
    this.presenter = new JsonInputPresenterImpl();
  }

  ngOnInit() {
  }

  createInputData() {
    var json = JSON.parse(this.str);
    this.labelImportOK = "Dataset imported !";
    this.presenter.createInputData(json);
  }

  getPresenter():JsonInputPresenter {
    return this.presenter;
  }

}
