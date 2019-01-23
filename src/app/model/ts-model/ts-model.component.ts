import { Component, OnInit, Input} from '@angular/core';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-ts-model',
  templateUrl: './ts-model.component.html',
  styleUrls: ['./ts-model.component.css']
})
export class TSModelComponentImpl implements OnInit, api.TSModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelDef:string;

  private presenter:api.TSModelPresenter;
    
  constructor(){
    this.presenter = new TSModelPresenterImpl();
  }

  ngOnInit(){
    // whenever the presenter changes its definition of the model
    // the string of the textarea changes
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getModelDef$().subscribe(s => this.modelDef = s);
  }

  getPresenter():api.ModelPresenter{ return this.presenter; }


}
