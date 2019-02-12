import { AfterViewInit, ViewChild, Component, OnInit, ElementRef} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import {DemoComponent, DemoPresenter, InputContainerComponent, JsonInputComponent} from '@api/core/demo';
import {ModelContainerComponent, ModelComponent, ModelPresenter, ModifParamModelComponent} from '@api/core/model';
import {DemoPresenterImpl} from './demo.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import { InputData } from '@api/core/inputData';

/* Graphic Component for the demo
 * Encapsulates input, model and parameter importation
 * components as well as visualisations
 */
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponentImpl implements AfterViewInit, DemoComponent {

  @ViewChild('input') input:InputContainerComponent;

  // TODO : dynamically choose modelcomponent
  @ViewChild('modelContainer') modelContainer:ModelContainerComponent;

  // DOM element triggering the training
  @ViewChild('trainButton') trainButton: ElementRef;

  @ViewChild('modifParam') modifParam: ModifParamModelComponent;
  // Presenter for this component
  private demo:DemoPresenter;

  // Inject the trainer service to give to the presenter
  constructor(private trainerService:TrainerServiceImpl){
    
  }

  ngAfterViewInit() {
    const a$ = new Subject<any>();
    fromEvent(this.trainButton.nativeElement, 'click').subscribe(a$);
    // Presenter takes all child component's presenters as arguments as well as the trainer service
    this.demo = new DemoPresenterImpl(this.modelContainer.getPresenter(), a$, this.trainerService, this.input.getPresenter(),  this.modifParam.getPresenter());
  }

}
