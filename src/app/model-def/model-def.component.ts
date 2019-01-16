import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { ModelTrainerService0, ModelTrainerService } from '../model-trainer.service';
import { Training, TrainingFactory} from '../training';


export interface ModelDefComponent {
  evaluateFields():Training; 
  getTrainings$():Observable<Training>;
  getModelDef():string;
  setModelDef(s:string):void;
}

@Component({
  selector: 'app-model-def',
  templateUrl: './model-def.component.html',
  styleUrls: ['./model-def.component.css']
})

export class ModelDefComponent implements OnInit, ModelDefComponent {

  private training: Training;
  private model_def: string;
  private training_def: string;
  private model_trainer: ModelTrainerService;
  @ViewChild('button') button: ElementRef;
  private trainings$: Observable<Training>;

  constructor( model_trainer: ModelTrainerService ) {
    this.model_trainer = model_trainer;
  }
  
  getTrainings$():Observable<Training>{ return this.trainings$; }
  getModelDef():string { return this.model_def; }
  setModelDef(s:string):void { this.model_def = s; }

  ngOnInit() {
    this.trainings$ = fromEvent(this.button.nativeElement, 'click')
      .pipe(map((event) => this.evaluateFields()));

    this.model_trainer.setTrainings$(this.trainings$);

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
    //console.log(evaluated);
    return TrainingFactory.createTraining(
      // get inputs from input box here
      {x: tf.tensor([[0,0], [0,1]]), y: tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]) },
      //
      evaluated.config,
      evaluated.model
    );
  }

  evaluate() {
    console.log(this.model_def);
    let result = ts.transpile(this.model_def+";let a={model:model, config:training};a");
    return eval(result);
  }

}


