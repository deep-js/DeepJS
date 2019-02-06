import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import * as tf from '@tensorflow/tfjs';

import * as api from '@api/core';
import {TSModelPresenterImpl} from './model/ts-model/ts-model.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import {TrainingImpl} from '../shared/models/training';
import { InputDataImpl } from '../shared/models/inputData';
import { InputData } from '@api/core/inputData';
import { JsonInputPresenter, InputPresenter } from '@api/core';

/* Presenter for the DemoComponent
 * performs the logic for it
 */
export class DemoPresenterImpl implements OnInit, api.DemoPresenter {

  private modelPresenter:api.ModelPresenter;
  private trainings$:Observable<api.Training>;
  private inputPresenter: InputPresenter;

  constructor( modelPresenter:api.ModelPresenter, trainButton$:Observable<any>, trainerService:TrainerServiceImpl, inputPresenter:InputPresenter) {
    this.modelPresenter = modelPresenter;
    this.inputPresenter = inputPresenter;

    // Construct the Observable on Trainings from the button events
    this.trainings$ = trainButton$.pipe(switchMap((event) => 
      modelPresenter.import()), map(model =>
        new TrainingImpl(
          /*{x: tf.tensor([[0,0,0], [0,1,0]]), y: tf.tensor([[0.5], [0.2]]) }*/
          { x: this.inputPresenter.getXTensor(), y: this.inputPresenter.getYTensor() },
          { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true },
          model
        )
      )
    );

    // give it to trainer service
    trainerService.setTrainings$(this.trainings$);

  }

  ngOnInit() {
  }

}

