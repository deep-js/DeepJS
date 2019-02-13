import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Subject, Observer, BehaviorSubject } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceJSONPresenter, Training } from '@api/core';
import * as tf from '@tensorflow/tfjs';

// Ghetto implementation of epoch visualisation
export class VisualizationInferenceJSONPresenterImpl implements VisualizationInferenceJSONPresenter{

  private modelTrainer: TrainerService;

  // Observable on training events retrieved from TrainerService
  private trainings$: Observable<Training>;
  private trainer$: Observable<TrainData>;

  private inferenceInput$: Subject<string>;
  private inferenceOutput$: Subject<string>;

  private inferenceInput: string;

  private training:Training;

  constructor( modelTrainer: TrainerServiceImpl ) {
    this.modelTrainer = modelTrainer;
    this.inferenceInput$ = new BehaviorSubject("[[0,0,0]]");
    this.inferenceOutput$ = new BehaviorSubject("[]");
    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an epoch and having an epoch number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % 1 === 0)
    );

    this.modelTrainer.getCurrentTrainings$().subscribe(
      training => this.training = training
    );

    // For each resulting TrainData, display the epoch number
    this.trainer$.subscribe(
      data => this.infer()
    )

    this.inferenceInput$.subscribe( input => this.inferenceInput = input);

  }

  private infer():void{
    // TODO : tf.tidy
    try{
      var input:tf.Tensor = tf.tensor(JSON.parse(this.inferenceInput));
      const output = this.training.getModel().predict(input);
      //const out:string = JSON.stringify(output.dataSync());
      const out:string = output.toString();
      this.inferenceOutput$.next(out);
    }
    catch(e){
      this.inferenceOutput$.next(e);
    }
  }

  public getInferenceInput$():Observable<string> { return this.inferenceInput$; }
  public getInferenceOutput$():Observable<string> { return this.inferenceOutput$; }
  
  public getData$():Observable<string>{
    return this.getInferenceOutput$();
  }
}

