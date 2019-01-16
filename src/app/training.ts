import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Training {

  getInputs(): any;
  getConfig(): tf.ModelFitConfig;
  getModel(): tf.Model;
  
  setInputs(inputs: any):void;
  setConfig(config: tf.ModelFitConfig):void;
  setModel(model: tf.Model):void;
  

}

export class TrainingFactory {
	public static createTraining(inputs,config,model){
		return new Training0(inputs,config,model);
	}
}

class Training0 implements Training{

  private inputs:any;
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


