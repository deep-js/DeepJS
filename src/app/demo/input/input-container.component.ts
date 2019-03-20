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
  private mapSons = new Map()
    .set("image", ImageInputComponentImpl)
    .set("json", JsonInputComponentImpl);
  
  public presenter:InputContainerPresenter;
  
  private typeInputKeys : string[];

  private child : InputComponent;

  private typeInput : string = "";

  @ViewChild(InjectComponentDirective) injectComponent : InjectComponentDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public ngOnInit() {
    this.typeInput = "json";
    this.typeInputKeys = Array.from(this.mapSons.keys());
    this.presenter = new InputContainerPresenterImpl();
    this.changeComponent();
  }

  public changeComponent(){
    if(this.mapSons.has(this.typeInput) ){
      // componentFactory becomes the 'recipe' of the current 'type'InputComponentImpl
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mapSons.get(this.typeInput));

      // get the View Container Reference grom injectComponent and clear it
      let viewContainerRef = this.injectComponent.viewContainerRef;
      viewContainerRef.clear();

      // use componentFactory recipe to create a new component
      let componentRef = viewContainerRef.createComponent(componentFactory);

      // reference the new component to 'child' variable and set the current present to it
      this.child = <InputComponent>componentRef.instance;
      this.presenter.setInputPresenter(this.child.getPresenter());
    }
  }
  
  public getPresenter():InputContainerPresenter{
    return this.presenter;
  }
}
