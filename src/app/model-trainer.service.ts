import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {Observable, Observer} from 'rxjs'
import {share} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class TrainingData {
  epoch:number;

  constructor(e:number){
    this.epoch = e;
  }

}

export class ModelTrainerService {

  currentModel: tf.Sequential;
  trainer$: Observable<TrainingData>;
  callbacks: tf.CustomCallbackConfig;

  constructor() {
    this.trainer$ = Observable.create(function (observer) {
      observer.next(new TrainingData(0));
      var i = 0;
      setInterval(() => {
        observer.next(new TrainingData(Math.random()));i++;
      },1000);
      //observer.complete();
    }).pipe(share());
  }

  train( model:tf.Sequential, training:tf.ModelFitConfig, inputs:any ){
    this.currentModel = model;
    // notify observers subscribed to model-def
    
    training.callbacks = this.callbacks;

    model.fit(inputs.x, inputs.y, training);
  
  }

}

