import { Component, OnInit } from '@angular/core';
import {ImageInputComponent, ImageInputPresenter} from '@api/core/demo/input/image-input';
import { InputPresenter } from '@api/core';
import {ImageInputPresenterImpl} from './image-input.presenter';
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

  private imageFiles:FileList;

  private presenter:ImageInputPresenter;
    
  constructor(){
    this.presenter = new ImageInputPresenterImpl();
  }

  ngOnInit(){
    // whenever the presenter changes the path of the json files
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getImageFiles$().subscribe(s => this.imageFiles = s);
  }

  getPresenter():InputPresenter {
    return this.presenter;
  }
}
