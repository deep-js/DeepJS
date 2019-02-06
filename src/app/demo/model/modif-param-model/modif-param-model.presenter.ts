import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';
import { ModelFitConfig } from '@tensorflow/tfjs';

export class ModifParamModelPresenterImpl implements api.ModifParamModelPresenter{

    private modelFitConfig: ModelFitConfig;

    // CHANGER DE VERSION DE TENSORFLOW ET MODIFIER MODELFITCONFIG EN MODELFITARGS

    private buttons : string[] = [
      'batchSize',
      'epochs',
      'verbose',
      'callbacks',
      'validationSplit',
      'validationData',
      'shuffle',
      'classWeight',
      'sampleWeight',
      'initialEpoch',
      'stepsPerEpoch',
      'validationSteps',
      'yieldEvery'

    ];

    constructor() {
      
    }

    // Return the ModelFitConfig 
    getModelFitConfig():ModelFitConfig{
      this.setModelFitConfig(); // Just to test, bad thing to do
      //return this.modelFitConfig = Object.assign({batchSize : 10, epochs : 10}, this.modelFitConfig);
      return <ModelFitConfig> this.modelFitConfig;
    }

    // Set the ModelFitConfig with the parameters in the text box
    setModelFitConfig():void {
      this.modelFitConfig = {
        // Parameters with their default value if they have one
        batchSize: 32,
        epochs: 1,
        verbose: 1,
        //callbacks: 0,
        validationSplit: 0,
        //validationData: 0,
        shuffle: true,
        //classWeight: 0,
        //sampleWeight: 0,
        initialEpoch: 0,
        stepsPerEpoch: 0,
        validationSteps: 0,
        yieldEvery: 'auto'
      }
    }

    getParams():string[]{
      return this.buttons;
    }

    hideAndShowTrainParm() {
      var x = document.getElementById("modif-param");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
}