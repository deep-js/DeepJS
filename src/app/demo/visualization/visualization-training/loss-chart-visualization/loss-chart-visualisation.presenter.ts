import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer, BehaviorSubject } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingPresenter } from '@api/core';

/**
 * Presenter for LossChartVisualizationComponent
 * 
 */
export class LossChartVisualizationPresenter implements VisualizationTrainingPresenter{

/*  private modelTrainer: TrainerService;
  private loss-chart: number;
  private period: number;   // period at which the visualisation is updated (every n end of loss-chart)

  // Observable on training events retrieved from TrainerService
  private trainer$: Observable<TrainData>;
  private loss-chart$: BehaviorSubject<number>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.modelTrainer = modelTrainer;
    this.period = 1;
    this.loss-chart = 0;
    this.loss-chart$ = new BehaviorSubject(0);
    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an loss-chart and having an loss-chart number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0)
    );

    // For each resulting TrainData, display the loss-chart number
    this.trainer$.subscribe(
      data => this.loss-chart$.next(data.getLossChart()));
  }
  
  getData$():Observable<number>{
    return this.loss-chart$;
  }*/
  getData$():Observable<any>{return null;}
}

