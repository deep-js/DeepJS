import { Component, OnInit } from '@angular/core';
import { ModifParamModelPresenterImpl } from './modif-param-model.presenter';
import * as api from '@api/core';
import { ModelFitConfig } from '@tensorflow/tfjs';
import { ModifParamModelPresenter } from '@api/core';

@Component({
  selector: 'app-modif-param-model',
  templateUrl: './modif-param-model.component.html',
  styleUrls: ['./modif-param-model.component.css']
})
export class ModifParamModelComponentImpl implements OnInit, api.ModifParamModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelDef:string;
  
  private presenter: api.ModifParamModelPresenter;

  constructor() { 
    this.presenter = new ModifParamModelPresenterImpl();
    this.modelDef = this.presenter.getModelDef();
  }

  ngOnInit() {

  }

  getPresenter():ModifParamModelPresenter {
    return this.presenter;
  }

}
