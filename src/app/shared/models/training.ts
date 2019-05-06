import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import * as api from '@api/core';


/* Data Structure for the Training
 * Encapsulates what is needed to perform a training
 */
export class TrainingImpl implements api.Training{

  private inputs:api.InputData;
  private config: tf.ModelFitArgs;  // training parameters
  private model: tf.Model;

  constructor(inputs, config, model){
    this.inputs = inputs;
    this.config = config;
    this.model = model;
  }

  getInputs(): api.InputData { return this.inputs; }
  getConfig(): tf.ModelFitArgs { return this.config; }
  getModel(): tf.Model { return this.model; }
  
  setInputs(inputs: api.InputData):void { this.inputs = inputs; }
  setConfig(config: tf.ModelFitArgs):void { this.config = config; }
  setModel(model: tf.Model):void { this.model = model; }
}


