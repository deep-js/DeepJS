import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {Observable, Observer} from 'rxjs'
import {share, switchMap} from 'rxjs/operators'
import { Training } from './model-def/model-def.component';


export enum TrainEvent {
  TrainBegin,
  TrainEnd,
  EpochBegin,
  EpochEnd,
  BatchBegin,
  BatchEnd
}


export class TrainData {
  epoch:number;
  batch:number;
  event:TrainEvent;
  loss:number;

  constructor(ev:TrainEvent, ep:number, b:number, l:number){
    this.event = ev;
    this.epoch = ep;
    this.batch = b;
    this.loss = l;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ModelTrainerService {

  currentTrainings$: Observable<Training>;
  currentTraining: Training;
  trainer$: Observable<TrainData>;
  callbacks: tf.CustomCallbackConfig;

  constructor() {
    //const inputs = tf.tensor([1, 2, 3, 4], [4, 1])
    console.log("modeltrainerservice constructor")
  }

  setEvent( reload$:Observable<Training>){
    console.log("modeltrainerservice setevent")
    this.currentTrainings$ = reload$;
    this.trainer$ = reload$.pipe( switchMap((training) =>
      Observable.create(observer => {
        this.currentTraining = training;
        //console.log(model);

        let x = this.currentTraining.inputs.x;
        let y = this.currentTraining.inputs.y;
        let m = this.currentTraining.model as tf.Sequential;
        console.log(training);
        m.fit(x, y, {epochs: 1000, callbacks: {
          onTrainBegin: () => {
            observer.next(new TrainData(TrainEvent.TrainBegin, 0, 0, 0));
          },
          onTrainEnd: (epoch, logs) => {
            observer.next(new TrainData(TrainEvent.TrainEnd, epoch, 0, 0));
          },
          onEpochBegin: async (epoch, logs) => {
            observer.next(new TrainData(TrainEvent.EpochBegin, epoch, logs.batch, logs.loss));
          },
          onEpochEnd: async (epoch, logs) => {
            observer.next(new TrainData(TrainEvent.EpochEnd, epoch, logs.batch, logs.loss));
          },
          onBatchBegin: async (epoch, logs) => {
            observer.next(new TrainData(TrainEvent.BatchBegin, epoch, logs.batch, logs.loss));
          },
          onBatchEnd: async (epoch, logs) => {
            observer.next(new TrainData(TrainEvent.BatchEnd, epoch, logs.batch, logs.loss));
          }

        } as tf.CustomCallbackConfig});

      }).pipe(share())
    ));
  }
  /*
  train( model:tf.Sequential, training:tf.ModelFitConfig, inputs:any ){
    this.currentTraining = model;
    // notify observers subscribed to model-def

    //    training.callbacks = this.callbacks;

    this.trainer$ = Observable.create(observer => {
      const inputs = tf.tensor([[0,0], [0,1]]);
      const outputs = tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]);

      this.currentTraining.fit(inputs, outputs, {epochs: 1000, callbacks: {
        onTrainBegin: () => {

        },
        onTrainEnd: (epoch, logs) => {
        },
        onEpochBegin: async (epoch, logs) => {
        },
        onEpochEnd: async (epoch, logs) => {
          observer.next(new TrainData(epoch));
        },
        onBatchBegin: async (epoch, logs) => {
        },
        onBatchEnd: async (epoch, logs) => {
        }

      } as tf.CustomCallbackConfig});

    }).pipe(share());

  }*/

}

