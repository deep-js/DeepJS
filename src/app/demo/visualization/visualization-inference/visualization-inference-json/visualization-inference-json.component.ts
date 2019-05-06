import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceJSONComponent, VisualizationInferenceJSONPresenter} from '@api/core';
import { VisualizationInferenceJSONPresenterImpl } from './visualization-inference-json.presenter'

@Component({
  selector: 'app-visualization-inference-json',
  templateUrl: './visualization-inference-json.component.html',
  styleUrls: ['./visualization-inference-json.component.css']
})

/**
 * Implementation for VisualizationInferenceJSONComponent
 *
 */
export class VisualizationInferenceJSONComponentImpl implements AfterContentInit, VisualizationInferenceJSONComponent{

  private inferenceInput:string;
  private inferenceOutput:string;
  private presenter:VisualizationInferenceJSONPresenter;


  // Observable on training events retrieved from TrainerService

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.presenter = new VisualizationInferenceJSONPresenterImpl(modelTrainer);
    this.presenter.getInferenceInput$().subscribe(input => this.inferenceInput = input);
    this.presenter.getInferenceOutput$().subscribe(output => this.inferenceOutput = output);
  }

  ngAfterContentInit() {


  }

}
