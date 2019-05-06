import { Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import {VisualizationModelPresenter, VisualizationModelComponent} from '@api/core';
import { TextVisualizationModelPresenter } from './text-model-visualization.presenter';


/**
 * Quick implementation of a textual model visualization
 * using tf.LayersModel.summarize
 */
@Component({
  selector: 'app-text-model-visualization',
  templateUrl: './text-model-visualization.component.html',
  styleUrls: ['./text-model-visualization.component.css']
  
})
export class TextVisualizationModelComponent implements AfterViewInit, VisualizationModelComponent{

  out: string;  // textual summary of the model
  presenter: VisualizationModelPresenter;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.out = "";
    this.presenter = new TextVisualizationModelPresenter(modelTrainer);
  }

  ngAfterViewInit() {
    this.presenter.getData$().subscribe((data) => this.out = data);
  }

}
