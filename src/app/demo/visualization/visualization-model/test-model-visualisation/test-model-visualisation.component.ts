import { Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import {VisualizationModelPresenter, VisualizationModelComponent} from '@api/core';
import { TestModelVisualizationPresenter } from './test-model-visualisation.presenter';


/* Quick implementation of a textual model visualisation
 * using tf.Model.summarize
 */
@Component({
  selector: 'app-test-model-visualisation',
  templateUrl: './test-model-visualisation.component.html',
  styleUrls: ['./test-model-visualisation.component.css']
  
})
export class TestModelVisualizationComponent implements AfterViewInit, VisualizationModelComponent{

  out: string;  // textual summary of the model
  presenter: VisualizationModelPresenter;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.out = "";
    this.presenter = new TestModelVisualizationPresenter(modelTrainer);
  }

  ngAfterViewInit() {
    this.presenter.getData$().subscribe((data) => this.out = data);
  }

}
