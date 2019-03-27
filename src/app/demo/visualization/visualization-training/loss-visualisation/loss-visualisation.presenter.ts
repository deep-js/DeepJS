import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Observer, BehaviorSubject } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationTrainingPresenter } from '@api/core';

/**
 * Presenter for LossVisualizationComponent
 * 
 */
export class LossVisualizationPresenter implements VisualizationTrainingPresenter{

  private modelTrainer: TrainerService;
  private loss: number;
  private period: number;
  // Observable on training events retrieved from TrainerService
  private trainer$: Observable<TrainData>;
  private loss$: BehaviorSubject<number>;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.modelTrainer = modelTrainer;
    this.period = 50;
    this.loss = 0;
    this.loss$ = new BehaviorSubject(0);
    
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % this.period === 0)
    );

    // For each resulting TrainData, display the loss number
    this.trainer$.subscribe(
	data => this.loss$.next(data.getLoss()));
  }
  
  getData$():Observable<number>{
    return this.loss$;
  }

}

