import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { ModelTrainerService } from '../model-trainer.service';


export class Training {
  /*x: tf.Tensor;
  y: tf.Tensor;*/
  inputs:any;
  config: tf.ModelFitConfig;
  model: tf.Model;

  constructor(inputs, config, model){
    this.inputs = inputs;
    this.config = config;
    this.model = model;
  }

}

@Component({
  selector: 'app-model-def',
  templateUrl: './model-def.component.html',
  styleUrls: ['./model-def.component.css']
})

export class ModelDefComponent implements OnInit {

  training: Training;
  model_def: string;
  training_def: string;
  model_trainer: ModelTrainerService;
  @ViewChild('button') button: ElementRef;
  reload$: Observable<Training>;

  constructor( model_trainer: ModelTrainerService ) {
    this.model_trainer = model_trainer;
  }

  ngOnInit() {
    this.reload$ = fromEvent(this.button.nativeElement, 'click')
      .pipe(map((event) => this.evaluateFields()));
    this.model_trainer.setEvent(this.reload$);
    //this.reload$.subscribe((model) => console.log(model));

    this.model_def="// Define a model for linear regression.\n\
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
  }

  /* Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   */
  evaluateFields():Training {
    
    
    //this.model_trainer.train(this.model, null, null);
    let evaluated = this.evaluate();
    console.log(evaluated);
    return new Training(
      {x: tf.tensor([[0,0], [0,1]]), y: tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]) },
      evaluated.config,
      evaluated.model
    );
  }

  evaluate() {
    console.log(this.model_def);
    let result = ts.transpile(this.model_def+";let a={model:model, config:training};a");
    return eval(result);
  }

  evaluateTrainingDef() {
    console.log(this.training_def);
    let result = ts.transpile(this.training_def+";training");
    return eval(result);
  }


}


