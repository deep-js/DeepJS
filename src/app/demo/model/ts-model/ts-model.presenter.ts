import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as api from '@api/core';
import { ModelDefBoxEmptyError } from 'src/app/shared/exceptions/ModelDefBoxEmptyError';

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


  constructor(defaultModel:Observable<string>) {

    // Default value for the model definition

    this.modelDef$ = new BehaviorSubject<string>("loading");
    defaultModel.subscribe(data => {
      // Make a Subject (kind of Observable) on the TypeScript string
      // Subscribe to it so we get updates from the Component
      // (the Component does a next on it at each key press)
      // Skip ourself sending the first string
      this.modelDef$.pipe( skip(1) ).subscribe(s => this.modelDef=s)
      this.modelDef$.next(data as string);
    })


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
    if (s == null)
      throw new ModelDefBoxEmptyError();
    
    // Add model at the end so that it is returned by eval
    let result = ts.transpile(s+";model;");
    try {
    var tmp = eval(result);
    if (tmp == null && tmp != undefined) {
      throw new ModelDefBoxEmptyError();
    }
    return eval(result);
    } catch(e) {
      throw new ModelDefBoxEmptyError();
    }
    return null;
    
  }

  public getModelDef$():Subject<string> { return this.modelDef$; }

  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
