import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingComponent, VisualizationTrainingPresenter} from '@api/core';
import { EpochVisualizationPresenter } from './epoch-visualisation.presenter'

@Component({
  selector: 'app-epoch-visualisation',
  templateUrl: './epoch-visualisation.component.html',
  styleUrls: ['./epoch-visualisation.component.css']
})

/**
 * Component displaying current epoch number
 *
 */
export class EpochVisualizationComponent implements AfterContentInit, VisualizationTrainingComponent{

  private epoch: number;
  private presenter:VisualizationTrainingPresenter;


  // Observable on training events retrieved from TrainerService
  private epoch$: Observable<TrainData>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.presenter = new EpochVisualizationPresenter(modelTrainer);
    this.epoch = 0;
    this.presenter.getData$().subscribe(epoch => this.epoch = epoch);
  }

  ngAfterContentInit() {


  }

}
