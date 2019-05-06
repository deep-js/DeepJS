import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { from, combineLatest, Observable, Subject, Observer, BehaviorSubject } from 'rxjs'
import { take, switchMap, tap, map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceImagePresenter, Training } from '@api/core';
import * as tf from '@tensorflow/tfjs';
import readImageData from 'read-image-data';

/**
 * Presenter for VisualizationInferenceImageComponent
 * @see {VisualizationInferenceImagePresenter}
 * Uses tfjs predict() for the inference
 * Automatically updates prediction every epoch. Gets notified of an epoch end
 * by following the training data observer from trainer.service
 * Also gets the current model from trainer.service
 * Uses the same mechanism as ImageInputPresenter for image import
 * @see {ImageInputPresenter}
 */
export class VisualizationInferenceImagePresenterImpl implements VisualizationInferenceImagePresenter{

  private modelTrainer: TrainerService;

  private training:Training;
  // Observable on training events retrieved from TrainerService
  private trainings$: Observable<Training>;
  private trainer$: Observable<TrainData>;

  private imageFiles$: Subject<FileList>;

  private inferenceOutput$: Observable<string[]>;

  private nbChannels:number = 1;
  private nbChannels$:Subject<number>;

  private imageDatas$:Observable<ImageData[]>;

  private imageTensors:tf.Tensor;

  constructor( modelTrainer: TrainerServiceImpl ) {

    this.modelTrainer = modelTrainer;

    // inputs to this Presenter
    this.nbChannels$ = new BehaviorSubject(this.nbChannels);
    this.nbChannels$.subscribe( input => this.nbChannels = input);

    this.imageFiles$ = new Subject();
    this.imageDatas$ = this.imageFiles$.pipe( 
      switchMap( (files) => combineLatest(Array.from(files).map( (file) => this.getImageData(file)))),
      tap( (imageDatas) => {
        this.imageTensors = tf.stack(imageDatas.map( (imageData) => tf.fromPixels(imageData as ImageData, this.nbChannels)))
      })
    );

    // outputs to this Presenter

    // For each TrainData emitted by TrainerService, keep only those corresponding to the
    // end of an epoch and having an epoch number multiple of the period
    this.trainer$ = this.modelTrainer.getTrainer$().pipe(
      filter(train => train.getEvent() == TrainEvent.EpochEnd && train.getEpoch() % 1 === 0)
    );

    this.modelTrainer.getCurrentTrainings$().subscribe(
      training => this.training = training
    );

    // For each resulting TrainData, make a prediction
    this.inferenceOutput$ = this.trainer$.pipe(
      filter( event => (this.imageTensors != null && this.imageTensors != undefined)),
      map( event => 
        {
          const a:tf.Tensor = this.training.getModel().predict(this.imageTensors) as tf.Tensor;
          return tf.unstack(a)
            .map( imagePred => {
              const predArray:number[] = imagePred.arraySync() as number[];
              console.log(predArray);
              const predAndLabels = predArray.map((a,i) => [this.getLabel(i),a]);
              predAndLabels.sort( (a,b) => <number>a[1]-<number>b[1]).reverse();
              console.log(predAndLabels);
              return predAndLabels.map( (n) => n[0]+": "+(<number>n[1]).toFixed(2)).join(',');
            });
        }
      )
    );
  }

  //TODO : do something about labels not being set when importing dataset via JSON
  private getLabel(i:number):string{
    if(this.training.getInputs().getLabels() != undefined){
      return this.training.getInputs().getLabels()[i];
    }
    else{
      return "?";
    }
  }
  private getImageData(file:File):Observable<ImageData> {
    return from(readImageData(file) as Promise<ImageData>).pipe(take(1));
  }

  /**
   * @see {VisualizationInferenceImagePresenter}
   */
  public getInferenceOutput$():Observable<string[]> { return this.inferenceOutput$; }

  /**
   * @see {VisualizationInferenceImagePresenter}
   */
  public getImageFiles$():Observable<FileList> { return this.imageFiles$; }

  /**
   * @see {VisualizationInferenceImagePresenter}
   */
  public getImageDatas$():Observable<ImageData[]> { return this.imageDatas$; }

  /**
   * @see {VisualizationInferencePresenter}
   */
  public getData$():Observable<string[]>{ return this.getInferenceOutput$(); }

  /**
   * @see {VisualizationInferenceImagePresenter}
   */
  public getNbChannels$():Subject<number>{ return this.nbChannels$; }
}

