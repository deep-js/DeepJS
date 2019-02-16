import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/** Implementation ModelContainerPresenter
 * makes the presenter of the model importation component available to DemoPresenter
 */
export class ModelContainerPresenterImpl implements api.ModelContainerPresenter{


  modelPresenter:api.ModelPresenter;

  constructor(modelPresenter:api.ModelPresenter) {
    this.modelPresenter=modelPresenter;
  }

  import():Observable<tf.Model>{
    return this.modelPresenter.import();
  }


}
