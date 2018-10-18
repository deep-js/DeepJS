import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {Observable, Observer} from 'rxjs'
import {share, switchMap} from 'rxjs/operators'


enum TrainEvent {
  TrainBegin,
  TrainEnd,
  EpochBegin,
  EpochEnd,
  BatchBegin,
  BatchEnd
}


export class TrainingData {
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

  currentModels$: Observable<tf.Sequential>;
  currentModel: tf.Sequential;
  trainer$: Observable<TrainingData>;
  callbacks: tf.CustomCallbackConfig;

  constructor() {
    //const inputs = tf.tensor([1, 2, 3, 4], [4, 1])
    console.log("modeltrainerservice constructor")
  }

  setEvent( reload$:Observable<tf.Sequential>){
    console.log("modeltrainerservice setevent")
    this.currentModels$ = reload$;
    this.trainer$ = reload$.pipe( switchMap((model) =>
      Observable.create(observer => {
        this.currentModel = model;
        console.log(model);
        const inputs = tf.tensor([[0,0], [0,1]]);
        const outputs = tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]);

        this.currentModel.fit(inputs, outputs, {epochs: 1000, callbacks: {
          onTrainBegin: () => {

          },
          onTrainEnd: (epoch, logs) => {
          },
          onEpochBegin: async (epoch, logs) => {
          },
          onEpochEnd: async (epoch, logs) => {
            observer.next(new TrainingData(TrainEvent.EpochEnd, epoch,0,0));
          },
          onBatchBegin: async (epoch, logs) => {
          },
          onBatchEnd: async (epoch, logs) => {
          }

        } as tf.CustomCallbackConfig});

      }).pipe(share())
    ));
  }
  /*
  train( model:tf.Sequential, training:tf.ModelFitConfig, inputs:any ){
    this.currentModel = model;
    // notify observers subscribed to model-def

    //    training.callbacks = this.callbacks;

    this.trainer$ = Observable.create(observer => {
      const inputs = tf.tensor([[0,0], [0,1]]);
      const outputs = tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]);

      this.currentModel.fit(inputs, outputs, {epochs: 1000, callbacks: {
        onTrainBegin: () => {

        },
        onTrainEnd: (epoch, logs) => {
        },
        onEpochBegin: async (epoch, logs) => {
        },
        onEpochEnd: async (epoch, logs) => {
          observer.next(new TrainingData(epoch));
        },
        onBatchBegin: async (epoch, logs) => {
        },
        onBatchEnd: async (epoch, logs) => {
        }

      } as tf.CustomCallbackConfig});

    }).pipe(share());

  }*/

}

