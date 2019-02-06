import { Component, OnInit, ViewChild, ComponentFactoryResolver, DoCheck } from '@angular/core';
import {InjectComponentDirective} from '../../shared/directives/inject-component.directive';
import * as api from '@api/core';
import {InputPresenterImpl} from './input.presenter';
import {ImageInputComponentImpl} from './image-input/image-input.component';
import {JsonInputComponentImpl} from './json-input/json-input.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponentImpl implements OnInit, api.InputComponent, DoCheck {

  private mapSons = new Map()
  .set("image", ImageInputComponentImpl)
  .set("json", JsonInputComponentImpl);

  private child : api.InputComponent;

	private typeInput : string = "";

	private presenter : api.InputPresenter;

	@ViewChild(InjectComponentDirective) injectComponent : InjectComponentDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {

  }

  ngOnInit() {
  	this.typeInput = "image";
  }

  ngDoCheck(){
    if(this.mapSons.has(this.typeInput)){
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mapSons.get(this.typeInput));
      let viewContainerRef = this.injectComponent.viewContainerRef;
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);
      this.child = <api.InputComponent>componentRef.instance;
      this.presenter = new InputPresenterImpl(this.child.getPresenter());
    }
  }

  getPresenter():api.InputPresenter{return this.presenter;}

}
