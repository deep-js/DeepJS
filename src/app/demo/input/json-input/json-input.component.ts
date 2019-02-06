import { Component, OnInit } from '@angular/core';
import {JsonInputComponent} from '@api/core/demo/input/json-input';
import * as api from '@api/core';
import {JsonInputPresenterImpl} from './json-input.presenter';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponentImpl implements OnInit, JsonInputComponent {

	private presenter: JsonInputPresenterImpl;

  data1 : string = "json1";
  data2 : string = "json2";
    
  constructor(){
    this.presenter = new JsonInputPresenterImpl();
  }

  ngOnInit() {
  }

  click(){
    console.log("click json");
    this.data1 = this.presenter.changeData1();
    this.data2 = this.presenter.changeData2();
    console.log(this.data1);
  }


  getPresenter():api.JsonInputPresenter{ return this.presenter; }

}
