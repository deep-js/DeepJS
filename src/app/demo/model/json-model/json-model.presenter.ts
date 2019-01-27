import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/* Presenter for JSONModelComponent
 * Performs the actual import from Typescript code to Object tf.Model
 */
export class JSONModelPresenterImpl implements api.JSONModelPresenter{

  private modelDef: string;
  private modelDef$: Subject<string>;
  private training_def: string;
  private model:tf.Model;


  constructor() {

    // Default value for the model definition
    this.modelDef="// Define a model for linear regression.\n\
const model = tf.sequential();\n\
\n\
const KERNEL_INIT = 'varianceScaling';\n\
\n\
//model layout is similar ConvNetJs' this.model \n\
// 2 inpujson : x,y \n\
model.add(tf.layers.dense({unijson: 20, inputShape: [2], activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
model.add(tf.layers.dense({unijson: 3, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
// 3 outpujson : rgb \n\
\n\
const BATCH_SIZE = 250;\n\
// did not tinker much with that \n\
const LEARNING_RATE = 0.1;\n\
\n\
// ConvNetJS has a momentum variable, so the optimizer was chosen accordingly \n\
const MOMENTUM = 0.9;\n\
const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);\n\
// Prepare the model for training: Specify the loss and the optimizer. \n\
model.compile({loss: 'meanSquaredError', optimizer: optimizer});"


    // Make a Subject (kind of Observable) on the TypeScript string
    this.modelDef$ = new BehaviorSubject<string>(this.modelDef);
    
    // Subscribe to it so we get updates from the Component
    // (the Component does a next on it at each key press)
    // Skip ourself sending the first string
    this.modelDef$.pipe( skip(1) ).subscribe(s => this.modelDef=s)
  }

  // Imporjson tf.Model object from TypeScript string
  import():tf.Model {
  	return JSON.parse(this.modelDef) as tf.Sequential;
  }

  // Provide the Observable on the Typescript string
  getModelDef$():Subject<string> { return this.modelDef$; }
    
  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
