import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer, BehaviorSubject } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingPresenter } from '@api/core';

/**
 * Presenter for EpochVisualizationComponent
 * 
 */
export class EpochVisualizationPresenter implements VisualizationTrainingPresenter{

  private modelTrainer: TrainerService;
  private epoch: number;
  private period: number;   // period at which the visualisation is updated (every n end of epoch)

  // Observable on training events retrieved from TrainerService
  private trainer$: Observable<TrainData>;
  private epoch$: BehaviorSubject<number>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.modelTrainer = modelTrainer;
    this.period = 1;
    this.epoch = 0;
    this.epoch$ = new BehaviorSubject(0);
    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an epoch and having an epoch number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0)
    );

    // For each resulting TrainData, display the epoch number
    this.trainer$.subscribe(
      data => this.epoch$.next(data.getEpoch()));
  }
  
  getData$():Observable<number>{
    return this.epoch$;
  }
}

