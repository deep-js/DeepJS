import { OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import * as tf from '@tensorflow/tfjs';

import {TSModelPresenterImpl} from './model/ts-model/ts-model.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import {TrainingImpl} from '../shared/models/training';
import { InputDataImpl } from '../shared/models/inputData';
import { InputData } from '@api/core/inputData';
import { DemoPresenter, ModelContainerPresenter, ModelPresenter, InputPresenter, Training, InputContainerPresenter } from '@api/core';

/* Presenter for the DemoComponent
 * performs the logic for it
 */
export class DemoPresenterImpl implements OnInit, DemoPresenter {

  private modelPresenter:ModelContainerPresenter;
  private trainings$:Observable<Training>;
  private inputPresenter: InputPresenter;

  constructor( modelPresenter:ModelContainerPresenter, trainButton$:Subject<any>, trainerService:TrainerServiceImpl, inputPresenter:InputContainerPresenter) {
    this.modelPresenter = modelPresenter;
    this.inputPresenter = inputPresenter;

    // Construct the Observable on Trainings from the button events
    this.trainings$ = trainButton$.pipe(switchMap((event) => 
      modelPresenter.import()), map(model =>
        new TrainingImpl(
          /*{x: tf.tensor([[0,0,0], [0,1,0]]), y: tf.tensor([[0.5], [0.2]]) },*/
          this.inputPresenter.getInputData(),
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

