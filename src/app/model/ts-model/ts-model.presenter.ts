import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

export class TSModelPresenterImpl implements api.TSModelPresenter{

  private modelDef: string;
  private modelDef$: Subject<string>;
  private training_def: string;
  private model:tf.Model;

  /*constructor( model_trainer: ModelTrainerService ) {
    this.model_trainer = model_trainer;
  }*/
  

  constructor() {
    //this.model_trainer.setTrainings$(this.trainings$);

    this.modelDef="// Define a model for linear regression.\n\
const model = tf.sequential();\n\
\n\
const KERNEL_INIT = 'varianceScaling';\n\
\n\
//model layout is similar ConvNetJs' this.model \n\
// 2 inputs : x,y \n\
model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
// 3 outputs : rgb \n\
\n\
const BATCH_SIZE = 250;\n\
// did not tinker much with that \n\
const LEARNING_RATE = 0.1;\n\
\n\
// ConvNetJS has a momentum variable, so the optimizer was chosen accordingly \n\
const MOMENTUM = 0.9;\n\
const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);\n\
// Prepare the model for training: Specify the loss and the optimizer. \n\
model.compile({loss: 'meanSquaredError', optimizer: optimizer});\n\
const training = { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true };"

    this.training_def = "const training = { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true }"

    this.modelDef$ = new BehaviorSubject<string>(this.modelDef);
    // skip ourself sending the first string
    this.modelDef$.pipe( skip(1) ).subscribe(s => this.modelDef=s)
  }

  /* Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   */
  
  import():tf.Model {
    let evaluated = this.evaluate(this.modelDef);
    return evaluated.model;   
  }

  evaluate(s:string) {
    let result = ts.transpile(s+";let a={model:model, config:training};a");
    return eval(result);
  }

  getModelDef$():Subject<string> { return this.modelDef$; }
    
  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
