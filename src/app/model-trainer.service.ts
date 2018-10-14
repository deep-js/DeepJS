import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelTrainerService {

  currentModel: tf.Sequential;
  callbacks: tf.CustomCallbackConfig;

  constructor() {
  
  }

  train( model:tf.Sequential, training:tf.ModelFitConfig, inputs:any ){
    this.currentModel = model;
    // notify observers subscribed to model-def
    
    training.callbacks = this.callbacks;

    model.fit(inputs.x, inputs.y, training);
  
  }

}
