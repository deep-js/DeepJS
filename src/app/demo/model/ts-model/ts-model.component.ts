import { Component, OnInit, Input} from '@angular/core';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as api from '@api/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ts-model',
  templateUrl: './ts-model.component.html',
  styleUrls: ['./ts-model.component.css']
})
/**
 * Implementation for TSModelComponent
 * Uses a simple textarea for input and an Subject shared with the presenter
 * for sharing input data with it
 */
export class TSModelComponentImpl implements OnInit, api.TSModelComponent {

  // String from the textarea, corresponding to the definition of the model in TypeScript
  private modelDef:string;

  // this component's presenter
  private presenter:api.TSModelPresenter;
    
  constructor(private http: HttpClient) {
    this.presenter = new TSModelPresenterImpl(http);
  }

  ngOnInit(){
    // whenever the presenter changes its definition of the model
    // the string of the textarea changes
    // equivalent to double way data binding but between the component and the presenter
    this.presenter.getModelDef$().subscribe(s => this.modelDef = s);
  }

  public getPresenter():api.ModelPresenter{ return this.presenter; }


}
