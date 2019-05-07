import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingComponent, VisualizationTrainingPresenter} from '@api/core';
import { LossVisualizationPresenter } from './loss-visualisation.presenter'

@Component({
  selector: 'app-loss-visualisation',
  templateUrl: './loss-visualisation.component.html',
  styleUrls: ['./loss-visualisation.component.css']
})

/**
 * Component displaying current loss number
 *
 */
export class LossVisualizationComponent implements AfterContentInit, VisualizationTrainingComponent{

  private loss: number;
  private presenter:VisualizationTrainingPresenter;


  // Observable on training events retrieved from TrainerService
  private loss$: Observable<TrainData>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.presenter = new LossVisualizationPresenter(modelTrainer);
    this.loss = 0;
    this.presenter.getData$().subscribe(loss => this.loss = loss);
  }

  ngAfterContentInit() {


  }

}
