import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from, Subject, BehaviorSubject} from 'rxjs';
import { tap, skip, switchMap} from 'rxjs/operators';
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
  private model:tf.LayersModel;
  private tfjs;


  constructor(defaultModel:Observable<string>,http: HttpClient) {

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
    http.get('assets/tfjs@1.1.2', { responseType: 'text' }).subscribe( (a) => this.tfjs = a);
  }

  // Imports tf.LayersModel object from TypeScript string
  import():Observable<tf.LayersModel>{
   /* let evaluated = this.evaluate(this.modelDef);
    return new BehaviorSubject<tf.LayersModel>(evaluated);   */
    return this.evaluate(this.modelDef);
  }

  /* Evaluates the TypeScript string to retrieve the tf.LayersModel object
   *
   * Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   */
  private evaluate(s:string):Observable<tf.LayersModel> {




    /*const model = tf.sequential();

    model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 3,
      filters: 16,
      activation: 'relu'
    }));

    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));

    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));

    model.add(tf.layers.flatten({}));

    model.add(tf.layers.dense({units: 64, activation: 'relu'}));

    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

    const optimizer = 'rmsprop';

    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;*/
    if (s == null)
      throw new ModelDefBoxEmptyError();

    // Add model at the end so that it is returned by eval
    //let compileOption = { moduleResolution: ts.ModuleResolutionKind.NodeJs} as ts.CompilerOptions;
    //let result = ts.transpile("import * as tf from '@tensorflow/tfjs';"+s+";model;", compileOption);
    //let result = this.tfjs+";"+s+";model;";
    //let result = "import * as tf from '@tensorflow/tfjs';"+s+";model;";
    let result = s+";model.save('indexeddb://model')";
    try {
      //var tmp = Function(result)();
      var tmp = eval(result);
      //var tmp = eval.call(this, result);
      //(tmp = function(){ return eval.apply(this, result); }()); 
      /*var tmp = (1, eval)(result).then( () => { const a = tf.loadLayersModel('indexeddb://model');
        console.log(a); return a;
      });*/
      return from(tmp).pipe(switchMap(() => {  
        // erase loaded model
        tf.disposeVariables();
        return from(tf.loadLayersModel('indexeddb://model'))
      }), 
        tap((model) => model.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'], })
        ));
      console.log(tmp);
      //var tmp = this.TestClass.Run.call(this,result);
      //var tmp = window.execScript(result);
      //tmp = tf.loadLayersModel('indexeddb://model');
      if (tmp == null && tmp != undefined) {
        throw new ModelDefBoxEmptyError();
      }
      return tmp;
    } catch(e) {
      console.log(e.message);
      throw new ModelDefBoxEmptyError();
    }
    return null;

  }

  public getModelDef$():Subject<string> { return this.modelDef$; }

  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
