import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, Subject, Observer, BehaviorSubject } from 'rxjs'
import { switchMap, concatMap, merge,map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceJSONPresenter, Training } from '@api/core';
import * as tf from '@tensorflow/tfjs';

/**
 * Presenter for VisualizationInferenceJSONComponent
 * Uses tfjs predict() for the inference
 * Automatically updates prediction every epoch by following
 * the training data observer from trainer.service
 */
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
    this.inferenceInput$ = new BehaviorSubject("[[[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[113],[142],[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[254],[11],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[49],[240],[182],[4],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[52],[241],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[88],[142],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[7],[208],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[46],[237],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[255],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[171],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[113],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[210],[35],[30],[30],[30],[30],[19],[28],[250],[255],[157],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[59],[224],[254],[254],[254],[254],[254],[254],[222],[247],[254],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[25],[71],[71],[82],[189],[189],[98],[71],[71],[220],[254],[176],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[76],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]]");
    this.inferenceOutput$ = new BehaviorSubject("[]");
    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an epoch and having an epoch number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % 1 === 0)
    );

    this.modelTrainer.getCurrentTrainings$().subscribe(
      training => this.training = training
    );

    // For each resulting TrainData, make a prediction
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
      const out:string = output.toString(); // wait for and stringify result by calling tfjs' toString() 
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

