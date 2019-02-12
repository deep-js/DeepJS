import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';
import { ModelFitConfig } from '@tensorflow/tfjs';

export class ModifParamModelPresenterImpl implements api.ModifParamModelPresenter{


    private modelDef: string;

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
      this.modelDef="{\"batchSize\": , \"epochs\": , \"verbose\": , " + 
      "\"callbacks\": \"validationSplit\": , \"validationData\": \"shuffle\": , \"classWeight\": " + 
      "\"sampleWeight\": , \"initialEpoch\": \"stepsPerEpoch\": , \"validationSteps\": \"yieldEvery\": }";
     
    }

    getModelDef():string{
      return this.modelDef;
    }

    // Return the ModelFitConfig 
    getModelFitConfig():ModelFitConfig{
      var json = JSON.parse(this.modelDef);
      return json;
    }

    // Set the ModelFitConfig with the parameters in the text box
    setModelDef(str : string) {
      this.modelDef = str;
      console.log("SetModelDef = " + this.modelDef)
    }

    getParams():string[]{
      return this.buttons;
    }

    hideAndShowTrainParam() {
      var x = document.getElementById("modif-param");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
}