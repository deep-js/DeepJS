import { Component, OnInit } from '@angular/core';
import {ImageInputComponent} from '@api/core/demo/input/image-input';
import * as api from '@api/core';
import {ImageInputPresenterImpl} from './image-input.presenter';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

	private presenter:api.ImageInputPresenter;

  private data1 : string;
  private data2 : string;
    
  constructor(){
    this.data1 ="image1";
    this.data2 ="image2";
    this.presenter = new ImageInputPresenterImpl();
  }

  ngOnInit() {
  }

  

  click(){
    console.log("click image");
    this.data1 = "newdata";
    /*this.data1 = this.presenter.changeData1();
    this.data2 = this.presenter.changeData2();

    console.log(this.data1);
    console.log(this.data2);*/
  }

  getPresenter():api.ImageInputPresenter{ return this.presenter; }

}
