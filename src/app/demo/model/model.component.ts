import { Component, OnInit, Input} from '@angular/core';
import { ModelPresenterImpl } from './json-model.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-json-model',
  templateUrl: './json-model.component.html',
  styleUrls: ['./json-model.component.css']
})
export class ModelComponentImpl implements OnInit, api.ModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelFile:FileList;

  private presenter:api.ModelPresenter;
    
  constructor(){
    this.presenter = new ModelPresenterImpl();
  }

  ngOnInit(){
    // whenever the presenter changes ijson definition of the model
    // the string of the textarea changes
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getModelFile$().subscribe(s => this.modelFile = s);
  }

  getPresenter():api.ModelPresenter{ return this.presenter; }


}
