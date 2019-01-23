import { Component, OnInit, Input} from '@angular/core';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-ts-model',
  templateUrl: './ts-model.component.html',
  styleUrls: ['./ts-model.component.css']
})
export class TSModelComponentImpl implements OnInit, api.TSModelComponent {
  private modelDef:string;
  private presenter:api.TSModelPresenter;
  //@Input() demo:api.DemoPresenter;
  // TODO : cannot inject interface, has to be able to replace TSModelPresenterImpl with a different implementation by only changing app.module
  //constructor( presenter: api.TSModelPresenter) { this.presenter = presenter;this.modelDef = this.presenter.getModelDef();}
    
  constructor(){
    this.presenter = new TSModelPresenterImpl();
  }

  ngOnInit(){
    this.presenter.getModelDef$().subscribe(s => this.modelDef = s);
  }
  getPresenter():api.ModelPresenter{ return this.presenter; }


}
