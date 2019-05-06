import { Component, OnInit, Input} from '@angular/core';
import { JSONModelPresenterImpl } from './json-model.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-json-model',
  templateUrl: './json-model.component.html',
  styleUrls: ['./json-model.component.css']
})
/**
 * Implementation of JSONModelComponent
 * Features a 'Browse' button to get the path of exported model files 
 * from the user
 */
export class JSONModelComponentImpl implements OnInit, api.JSONModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelFile:FileList;

  private presenter:api.JSONModelPresenter;
    
  constructor(){
    this.presenter = new JSONModelPresenterImpl();
  }

  ngOnInit(){
    // whenever the presenter changes the path of the json files
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getModelFile$().subscribe(s => this.modelFile = s);
  }

  getPresenter():api.ModelPresenter{ return this.presenter; }


}
