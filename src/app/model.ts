import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Model extends tf.Model {

  import(raw:any): void;

}

export class ModelFactory {
	public static createModel(inputs,config,model){
		return new TypeScriptModel(inputs,config,model);
	}
}

class TypeScriptModel implements Model{

  constructor(){
  }

  /* Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   */
  import(raw:string):Training {
    let evaluated = this.evaluate(raw);
    this = evaluated.model;
  }

  evaluate(s:string) {
    let result = ts.transpile(s+";let a={model:model, config:training};a");
    return eval(result);
  }
}


