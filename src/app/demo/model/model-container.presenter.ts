import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';
import { TrainerService } from 'src/app/shared/services/trainer/trainer.service'

import * as api from '@api/core';

/** 
 * Implementation ModelContainerPresenter
 * makes the presenter of the current model importation component available to DemoPresenter
 */
export class ModelContainerPresenterImpl implements api.ModelContainerPresenter{
 


  // presenter for the current model importation component
  private modelPresenter:api.ModelPresenter;

    constructor(trainerService: TrainerService) {
  }

  setModelPresenter(modelPresenter: api.ModelPresenter) {
    this.modelPresenter = modelPresenter;
  }

  importModel():Observable<tf.Model>{
    return this.modelPresenter.import();
  }

}
