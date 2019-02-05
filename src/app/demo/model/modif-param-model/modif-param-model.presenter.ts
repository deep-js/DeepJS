import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

export class ModifParamModelPresenterImpl implements api.ModifParamModelPresenter{

    private modelDef: string;
    private modelDef$: Subject<string>;

    // Problem on the Train button : does not work

    constructor() {

      // Default value for the model definition
      this.modelDef="batchSize = \n\
epochs = \n\
verbose = \n\
callbacks = \n\
validationSplit = \n\
validationData = \n\
shuffle = \n\
classWeight = \n\
sampleWeight = \n\
initialEpoch = \n\
stepsPerEpoch = \n\
validationSteps = \n\
yieldEvery = "
  
  
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
    evaluate(s:string) {
      // Add model at the end so that it is returned by eval
      let result = ts.transpile(s+";model;");
      return JSON.parse(result);
    }
  
    // Provide the Observable on the Typescript string
    getModelDef$():Subject<string> { return this.modelDef$; }
      
    // TODO : obsolete ?
    setModelDef(s:string):void { this.modelDef = s; }

}