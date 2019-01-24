import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as tf from '@tensorflow/tfjs';

import * as api from '@api/core';
import {TSModelPresenterImpl} from './model/ts-model/ts-model.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import {TrainingImpl} from '../shared/models/training';

export class DemoPresenterImpl implements OnInit, api.DemoPresenter {

  private modelPresenter:api.ModelPresenter;
  private trainings$:Observable<api.Training>;

  constructor( modelPresenter:api.ModelPresenter, trainButton$:Observable<any>, trainerService:TrainerServiceImpl) {
    this.modelPresenter = modelPresenter;
    this.trainings$ = trainButton$.pipe(map((event) => 
      {console.log("ok");
        return new TrainingImpl(
        { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true },
        {x: tf.tensor([[0,0], [0,1]]), y: tf.tensor([[0.5,0.5,0.5], [0.2,0.2,0.2]]) },
        modelPresenter.import()
      );}
    ));
    trainerService.setTrainings$(this.trainings$);
    
  }

  ngOnInit() {
  }

}

