import { Component, OnInit } from '@angular/core';
import { ModifParamModelPresenterImpl } from './modif-param-model.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-modif-param-model',
  templateUrl: './modif-param-model.component.html',
  styleUrls: ['./modif-param-model.component.css']
})
export class ModifParamModelComponentImpl implements OnInit, api.ModifParamModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelDef:string;

  private presenter:api.ModifParamModelPresenter;

  constructor() { 
    this.presenter = new ModifParamModelPresenterImpl();
  }

  ngOnInit() {
    // whenever the presenter changes its definition of the model
    // the string of the textarea changes
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getModelDef$().subscribe(s => this.modelDef = s);
  }


  getPresenter():api.ModelPresenter{ return this.presenter; }
}
