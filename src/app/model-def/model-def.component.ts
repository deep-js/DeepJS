import { Component, ViewChild, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-model-def',
  templateUrl: './model-def.component.html',
  styleUrls: ['./model-def.component.css']
})

export class ModelDefComponent implements OnInit {

  model: tf.Sequential;
  model_def: String;
  training_def: String;
  constructor() { }

  ngOnInit() {
    this.model_def="// Define a model for linear regression.\n\
this.model = tf.sequential();\n\
\n\
const KERNEL_INIT = 'varianceScaling';\n\
\n\
this.model layout is similar ConvNetJs' this.model \n\
// 2 inputs : x,y \n\
this.model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
this.model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: KERNEL_INIT}));\n\
// 3 outputs : rgb \n\
\n\
BATCH_SIZE = 250;\n\
// did not tinker much with that \n\
LEARNING_RATE = 0.1;\n\
\n\
// ConvNetJS has a momentum variable, so the optimizer was chosen accordingly \n\
const MOMENTUM = 0.9;\n\
const optimizer = tf.train.momentum(LEARNING_RATE,MOMENTUM);\n\
// Prepare the this.model for training: Specify the loss and the optimizer. \n\
this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});"

    this.training_def = "this.model.fit(xs, ys, { batchSize: BATCH_SIZE, epochs: 4000, validationSplit: 0, shuffle: true })"
  }

  evaluateModelDef() {
    //console.log(this.model_def);
//    eval(this.model_def);
    console.log(this.model);
  }
  

}


