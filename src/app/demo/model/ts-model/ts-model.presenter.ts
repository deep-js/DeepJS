import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/**
 * Implementation for TSModelComponent
 * Uses an inline definition of the default model
 * Communicates with its component via a Subject it creates
 */
export class TSModelPresenterImpl implements api.TSModelPresenter{

  private modelDef: string;
  private modelDef$: Subject<string>;
  private training_def: string;
  private model:tf.Model;


  constructor() {

    // Default value for the model definition
    this.modelDef="// Define a model for linear regression.\n\
const model = tf.sequential({layers: [tf.layers.dense({units: 1, inputShape: [3]})]});\n\
\n\
const BATCH_SIZE = 250;\n\
// did not tinker much with that \n\
const LEARNING_RATE = 0.1;\n\
\n\
// ConvNetJS has a momentum variable, so the optimizer was chosen accordingly \n\
const MOMENTUM = 0.9;\n\
const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);\n\
// Prepare the model for training: Specify the loss and the optimizer. \n\
const compile_options = {loss: 'meanSquaredError', optimizer: optimizer};\n\
console.log(JSON.stringify({compile_options}));\n\
model.compile(compile_options);"


    // Make a Subject (kind of Observable) on the TypeScript string
    this.modelDef$ = new BehaviorSubject<string>(this.modelDef);
    
    // Subscribe to it so we get updates from the Component
    // (the Component does a next on it at each key press)
    // Skip ourself sending the first string
    this.modelDef$.pipe( skip(1) ).subscribe(s => this.modelDef=s)
  }

  // Imports tf.Model object from TypeScript string
  import():Observable<tf.Model>{
    let evaluated = this.evaluate(this.modelDef);
    return new BehaviorSubject<tf.Model>(evaluated);   
  }

  /* Evaluates the TypeScript string to retrieve the tf.Model object
   *
   * Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   */
  private evaluate(s:string) {
    // Add model at the end so that it is returned by eval
    let result = ts.transpile(s+";model;");
    return eval(result);
  }

 public getModelDef$():Subject<string> { return this.modelDef$; }
    
  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
