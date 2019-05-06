import { ViewChild,Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import { ModelContainerPresenterImpl } from './model-container.presenter';
import * as api from '@api/core';
import { InjectComponentDirective } from 'src/app/shared/directives/inject-component.directive';
import { JSONModelComponentImpl } from './json-model/json-model.component';
import { TSModelComponentImpl } from './ts-model/ts-model.component';
import { TrainingImpl } from 'src/app/shared/models/training';
import * as tf from '@tensorflow/tfjs';
import { TrainerServiceImpl } from 'src/app/shared/services/trainer/trainer.service';

@Component({
  selector: 'app-model-container',
  templateUrl: './model-container.component.html',
  styleUrls: ['./model-container.component.css']
})
/** 
 * Implementation for ModelContainerComponent
 */
export class ModelContainerComponentImpl implements OnInit, api.ModelContainerComponent {
  
  // String from the textarea, corresponding to the definition of the model-container in TypeScript
    private presenter:api.ModelContainerPresenter;
    private model:tf.LayersModel;
    private trainerService:TrainerServiceImpl;
    
  // map the type of the modele wanted with his real component
  private mapSons = new Map()
    .set("json", JSONModelComponentImpl)
    .set("typescript", TSModelComponentImpl);

  private typeModelKeys : string[];

  // child selected, acces to his methods 
  private child : api.ModelComponent;

  // type of the current model definiton (json, ts, etc.)
  private typeModel : string = "";

 @ViewChild(InjectComponentDirective) injectComponent : InjectComponentDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver, trainerService: TrainerServiceImpl)
    {
      this.trainerService = trainerService;
      this.trainerService.getCurrentTrainings$().subscribe((training) => this.model = training.getModel());
  }


  ngOnInit(): void {
    //init typescript as default model type
    this.typeModel = "typescript";
    this.typeModelKeys = Array.from(this.mapSons.keys());
    this.presenter = new ModelContainerPresenterImpl(this.trainerService);
    this.changeComponent();
  }



  changeComponent(): any {
    if(this.mapSons.has(this.typeModel) ){
      //create an abstract component from corresponding component in the map
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.mapSons.get(this.typeModel));

      // get the visual of the place where the component will be injected thanks to the diretive placed on the balise ng-template
      let viewContainerRef = this.injectComponent.viewContainerRef;
      viewContainerRef.clear();

      //create and inject the component in the visual
      let componentRef = viewContainerRef.createComponent(componentFactory);

      // populate child to can have access to its methods
      this.child = <api.ModelComponent>componentRef.instance;
      //update the presenter by set the new child presenter
      this.presenter.setModelPresenter(this.child.getPresenter());
    }
  }


  getPresenter():api.ModelContainerPresenter{ return this.presenter; }

    exportModel():void {
	if (this.model === null || this.model == undefined) {
	    this.presenter.importModel().subscribe((model) => this.model = model);
	}
	//console.log(window.indexedDB);
	this.model.save('downloads://my-model-1');
    }
}
