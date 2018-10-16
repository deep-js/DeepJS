import { Component, ViewChild, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { ModelTrainerService } from '../model-trainer.service';

@Component({
  selector: 'app-model-def',
  templateUrl: './model-def.component.html',
  styleUrls: ['./model-def.component.css']
})

export class ModelDefComponent implements OnInit {

  model: tf.Sequential;
  training: tf.ModelFitConfig;
  model_def: string;
  training_def: string;
  model_trainer: ModelTrainerService;
  constructor( model_trainer: ModelTrainerService ) {
    this.model_trainer = model_trainer;
  }

  ngOnInit() {

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
model.compile({loss: 'meanSquaredError', optimizer: optimizer});"

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
  evaluateFields() {
    this.evaluateModelDef();
    this.evaluateTrainingDef();
    this.model_trainer.train(this.model, null, null);
  }

  evaluateModelDef() {
    console.log(this.model_def);
    let result = ts.transpile(this.model_def+";model;");
    this.model = eval(result);
    console.log(this.model);
  }

  evaluateTrainingDef() {
    console.log(this.training_def);
    let result = ts.transpile(this.training_def+";training");
    this.training = eval(result);
    console.log(this.training);
  }


}


