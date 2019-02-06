import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/* Presenter for ModelContainerComponent
 * Performs the actual import from Typescript code to Object tf.ModelContainer
 */
export class ModelContainerPresenterImpl implements api.ModelContainerPresenter{


  modelPresenter:api.ModelPresenter;

  constructor(modelPresenter:api.ModelPresenter) {
    this.modelPresenter=modelPresenter;
  }

  // Imporjson tf.ModelContainer object from TypeScript string
  import():Observable<tf.Model>{
    return this.modelPresenter.import();
  }


}
