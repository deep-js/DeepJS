import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { ModelTrainerService0, ModelTrainerService, TrainData, TrainEvent } from '../model-trainer.service';

@Component({
  selector: 'app-epoch-visualisation',
  templateUrl: './epoch-visualisation.component.html',
  styleUrls: ['./epoch-visualisation.component.css']
})

export class EpochVisualisationComponent implements OnInit {

  private modelTrainer: ModelTrainerService;
  private epoch: number;
  @ViewChild('plus') plus: ElementRef;
  @ViewChild('minus') minus: ElementRef;
  private period: number;
  private trainer$: Observable<TrainData>;

  constructor( modelTrainer: ModelTrainerService ) {
    this.modelTrainer = modelTrainer;
    this.period = 1;
    this.epoch = 0;
  }

  ngOnInit() {
    fromEvent(this.plus.nativeElement, "click").subscribe(ev => ++this.period);
    fromEvent(this.minus.nativeElement, "click").subscribe(ev => --this.period);
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0)
    );
    this.trainer$.subscribe(
      data => this.epoch = data.getEpoch()
    );
  }

}
