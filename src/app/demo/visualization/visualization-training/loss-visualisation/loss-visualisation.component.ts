
import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingComponent, VisualizationTrainingPresenter} from '@api/core';
import { LossVisualizationPresenter } from './loss-visualisation.presenter';
import d3 from 'd3';

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

  private presenter:VisualizationTrainingPresenter;
    private index:number;
    private loss:number;
  
  view: any[] = [2100, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Number of Epoch';
  showYAxisLabel = true;
  yAxisLabel = 'Loss';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  public multi = [{
    name: "Loss Chart",
    series: []
  }];

  // line, area
  autoScale = true;
  // Observable on training events retrieved from TrainerService
  private loss$: Observable<TrainData>;

  constructor( modelTrainer: TrainerServiceImpl ) {
      this.presenter = new LossVisualizationPresenter(modelTrainer);
      this.index = 10;
      this.presenter.getData$().subscribe(loss => this.callback(loss));
  }

    callback(loss): void {
	this.multi[0].series.push({name: this.index.toString(), value: loss});
	console.log(this.multi);
	this.index++;
	this.loss = loss;
    }

    ngAfterContentInit() {}

}