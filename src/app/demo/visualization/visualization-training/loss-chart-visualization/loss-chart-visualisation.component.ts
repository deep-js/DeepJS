import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingComponent, VisualizationTrainingPresenter} from '@api/core';
//import { LossChartVisualizationPresenter } from './loss-chart-visualisation.presenter'
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-loss-chart-visualisation',
  templateUrl: './loss-chart-visualisation.component.html',
  styleUrls: ['./loss-chart-visualisation.component.css']
})

/**
 * Component displaying current loss-chart number
 *
 */
export class LossChartVisualizationComponent implements AfterContentInit, VisualizationTrainingComponent{

  private period: number;   // period at which the visualisation is updated (every n end of loss-chart)

  public SystemName: string = "Loss";
  firstCopy = false;

  public data: Array<number> = [];

  public labelMFL: Array<any> = [
    { data: this.data,
      label: this.SystemName
    }
  ];
  public lineChartLabels: Array<any> = [];


  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
      }],
      xAxes: [{
      }]
    }
  };

  _lineChartColors:Array<any> = [{
    backgroundColor: 'red',
    borderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: 'red',
    pointHoverBorderColor: 'red' 
  }];



  private push(t){
    this.data.push(t.getLoss());
    this.lineChartLabels.push(t.getEpoch());
  }

  constructor( modelTrainer: TrainerServiceImpl ) {
    //this.presenter = new LossChartVisualizationPresenter(modelTrainer);
    //
    modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0),
    ).subscribe((t) => this.push(t))
  }


  ngAfterContentInit() {


  }

}
