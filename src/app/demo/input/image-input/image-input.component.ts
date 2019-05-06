import { Component, OnInit } from '@angular/core';
import {ImageInputComponent, ImageInputPresenter} from '@api/core/demo/input/image-input';
import { InputPresenter } from '@api/core';
import {ImageInputPresenterImpl} from './image-input.presenter';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
/**
 * Implementation for ImageInputComponent
 * Has a button for choosing a directory containing image files 
 * organized in directories corresponding to labels
 * Also has a field allowing the user to choose how many channels 
 * should be kept on the original image
 * All the file opening, image importing and general logic is done
 * in this component's presenter : ImageInputPresenter
 */
export class ImageInputComponentImpl implements OnInit, ImageInputComponent{

  private imageFiles:FileList;

  private presenter:ImageInputPresenter;

  private status:string;

  private nbChannels:number;

    
  constructor(){
    this.presenter = new ImageInputPresenterImpl();
    this.status = "";
    this.presenter.getStatus$().subscribe( (s) => this.status = s);
  }

  ngOnInit(){
    // whenever the presenter changes the path of the json files
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getImageFiles$().subscribe(s => this.imageFiles = s);
    this.presenter.getNbChannels$().subscribe(n => this.nbChannels = n);
  }



  /**
   * Get this component's presenter, 
   * Can be used to retrieve presenter data from components
   * parent to this componenet
   */
  getPresenter():InputPresenter {
    return this.presenter;
  }
}
