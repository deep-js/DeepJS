import { Input, Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { from, combineLatest, Observable, Subject, Observer, BehaviorSubject } from 'rxjs'
import { take, switchMap, tap, map,filter } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService, TrainData, TrainEvent } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationInferenceImagePresenter, Training } from '@api/core';
import * as tf from '@tensorflow/tfjs';
import readImageData from 'read-image-data';

/**
 * Presenter for VisualizationInferenceImageComponent
 * Uses tfjs predict() for the inference
 * Automatically updates prediction every epoch by following
 * the training data observer from trainer.service
 */
export class VisualizationInferenceImagePresenterImpl implements VisualizationInferenceImagePresenter{

  private modelTrainer: TrainerService;

  // Observable on training events retrieved from TrainerService
  private trainings$: Observable<Training>;
  private trainer$: Observable<TrainData>;

  private imageFiles$: Subject<FileList>;

  private inferenceOutput$: Observable<string[]>;

  private training:Training;

  private nbChannels:number = 1;
  private nbChannels$:Subject<number>;

  private imageDatas$:Observable<ImageData[]>;

  private imageTensors:tf.Tensor;

  constructor( modelTrainer: TrainerServiceImpl ) {

    this.modelTrainer = modelTrainer;

    // inputs
    this.nbChannels$ = new BehaviorSubject(this.nbChannels);
    this.nbChannels$.subscribe( input => this.nbChannels = input);

    this.imageFiles$ = new Subject();
    //this.imageFiles$.subscribe(a => console.log(a));
    this.imageDatas$ = this.imageFiles$.pipe( 
      /*filter( files =>  files != null),*/
      switchMap( (files) => combineLatest(Array.from(files).map( (file) => this.getImageData(file)))),
      /*switchMap( imageData => zip(imageData )),*/
      tap( (imageDatas) => {
        this.imageTensors = tf.stack(imageDatas.map( (imageData) => tf.fromPixels(imageData as ImageData, this.nbChannels)))
      })
    );
    //    this.imageDatas$.subscribe(a => console.log(a));

    // outputs

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
        /*    tf.tidy( () =>*/ {
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
        }//)
      )
    );
  }

  //TODO : do something about labels not being set
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

  public getInferenceOutput$():Observable<string[]> { return this.inferenceOutput$; }

  public getImageFiles$():Observable<FileList> { return this.imageFiles$; }

  public getImageDatas$():Observable<ImageData[]> { return this.imageDatas$; }

  public getData$():Observable<string[]>{ return this.getInferenceOutput$(); }

  public getNbChannels$():Subject<number>{ return this.nbChannels$; }
}

