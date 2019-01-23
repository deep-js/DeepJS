import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../trainer.service';

@Component({
  selector: 'app-epoch-visualisation',
  templateUrl: './epoch-visualisation.component.html',
  styleUrls: ['./epoch-visualisation.component.css']
})

// Ghetto implementation of epoch visualisation
export class EpochVisualisationComponent implements OnInit {

  private modelTrainer: TrainerService;
  private epoch: number;

  @ViewChild('plus') plus: ElementRef;  // buttons controling the period
  @ViewChild('minus') minus: ElementRef;

  private period: number;   // period at which the visualisation is updated (every n end of epoch)

  // Observable on training events retrieved from TrainerService
  private trainer$: Observable<TrainData>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.modelTrainer = modelTrainer;
    this.period = 1;
    this.epoch = 0;
  }

  ngOnInit() {

    // each time a button is pressed, update training
    fromEvent(this.plus.nativeElement, "click").subscribe(ev => ++this.period);
    fromEvent(this.minus.nativeElement, "click").subscribe(ev => this.period=Math.max(this.period-1,0));

    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an epoch and having an epoch number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0)
    );

    // For each resulting TrainData, display the epoch number
    this.trainer$.subscribe(
      data => this.epoch = data.getEpoch()
    );
  }

}
