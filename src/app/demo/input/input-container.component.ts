import { ViewChild, Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { InputContainerComponent, InputContainerPresenter, InputComponent, InputPresenter } from '@api/core/demo/input';
import { InputContainerPresenterImpl} from './input-container.presenter';
import {ImageInputComponentImpl} from './image-input/image-input.component';
import {JsonInputComponentImpl} from './json-input/json-input.component';
import {InjectComponentDirective} from '../../shared/directives/inject-component.directive';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponentImpl implements InputContainerComponent, OnInit{

  presenter:InputContainerPresenter;

  private mapSons = new Map()
    .set("image", ImageInputComponentImpl)
    .set("json", JsonInputComponentImpl);

  private typeInputKeys : string[];

  private child : InputComponent;

  private typeInput : string = "";

  @ViewChild(InjectComponentDirective) injectComponent : InjectComponentDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {
     
  }

  ngOnInit() {
    this.typeInput = "json";
    this.typeInputKeys = Array.from(this.mapSons.keys());
    this.presenter = new InputContainerPresenterImpl();
    this.changeComponent();
  }

  changeComponent(){
    if(this.mapSons.has(this.typeInput) ){

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mapSons.get(this.typeInput));

      let viewContainerRef = this.injectComponent.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);

      this.child = <InputComponent>componentRef.instance;
      this.presenter.setInputPresenter(this.child.getPresenter());
    }
  }



  getPresenter():InputContainerPresenter{return this.presenter;}

  

}
