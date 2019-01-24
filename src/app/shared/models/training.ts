import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import * as api from '@api/core';


export class TrainingImpl implements api.Training{

  private inputs: any;
  private config: tf.ModelFitConfig;
  private model: tf.Model;

  constructor(inputs, config, model){
    this.inputs = inputs;
    this.config = config;
    this.model = model;
  }

  getInputs(): any { return this.inputs; }
  getConfig(): tf.ModelFitConfig { return this.config; }
  getModel(): tf.Model { return this.model; }
  
  setInputs(inputs: any):void { this.inputs = inputs; }
  setConfig(config: tf.ModelFitConfig):void { this.config = config; }
  setModel(model: tf.Model):void { this.model = model; }
}


