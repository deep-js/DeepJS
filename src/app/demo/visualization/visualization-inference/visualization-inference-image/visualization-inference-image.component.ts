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
 * Has a "Browse" button to choose images to make a prediction on
 * and a small field for giving the number of channel that should be kept 
 * on the original images
 * displays the images with their prediction as a string below each
 *
 */
export class VisualizationInferenceImageComponentImpl implements AfterContentInit, VisualizationInferenceImageComponent{

  private imageDatas:ImageData[];
  private inferenceOutput:string[];
  private nbChannels:number;
  private presenter:VisualizationInferenceImagePresenter;


  // Observable on training events retrieved from TrainerService

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.presenter = new VisualizationInferenceImagePresenterImpl(modelTrainer);
    this.presenter.getImageDatas$().subscribe(d => this.imageDatas = d);
    this.presenter.getInferenceOutput$().subscribe(output => this.inferenceOutput = output);
    this.presenter.getNbChannels$().subscribe(nb => this.nbChannels = nb);
  }

  ngAfterContentInit() {


  }

}
