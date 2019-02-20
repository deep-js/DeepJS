import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceImageComponent, VisualizationInferenceImagePresenter} from '@api/core';
import { VisualizationInferenceImagePresenterImpl } from './visualization-inference-image.presenter'

@Component({
  selector: 'app-visualization-inference-image',
  templateUrl: './visualization-inference-image.component.html',
  styleUrls: ['./visualization-inference-image.component.css']
})

/**
 * Implementation for VisualizationInferenceImageComponent
 *
 */
export class VisualizationInferenceImageComponentImpl implements AfterContentInit, VisualizationInferenceImageComponent{

  private inferenceInput:string;
  private imageDatas:ImageData[];
  private output:string[];
  private nbChannels:number;
  private presenter:VisualizationInferenceImagePresenter;


  // Observable on training events retrieved from TrainerService

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.presenter = new VisualizationInferenceImagePresenterImpl(modelTrainer);
    this.presenter.getImageDatas$().subscribe(d => this.imageDatas = d);
    this.presenter.getInferenceOutput$().subscribe(output => this.inferenceOutput = output);
  }

  ngAfterContentInit() {


  }

}
