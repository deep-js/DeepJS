import { OnInit } from '@angular/core';
import { zip, Subject, Observable } from 'rxjs';
import { map, switchMap, share} from 'rxjs/operators'
import * as tf from '@tensorflow/tfjs';


import {TSModelPresenterImpl} from './model/ts-model/ts-model.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import {TrainingImpl} from '../shared/models/training';
import { InputDataImpl } from '../shared/models/inputData';
import { InputData } from '@api/core/inputData';
import { DemoPresenter, ModelContainerPresenter, ModelPresenter, InputPresenter, Training, InputContainerPresenter, ModifParamModelPresenter } from '@api/core';

/** Implementation for DemoPresenter
 *  Gathers all data from input, model and training parameters importation components 
 *  in order to make a Training object
 *  Then gives it to TrainerService
 *  In this implementation, all data comes up from the child components and is passed to
 *  the service that transmits them to the visualizations
 */
export class DemoPresenterImpl implements OnInit, DemoPresenter {

  private modelPresenter:ModelContainerPresenter;
  private trainings$:Observable<Training>;
  private inputPresenter: InputPresenter;
  private modifParamPresenter:ModifParamModelPresenter;

  // Constructs the Observable on Trainings from the button events
  private createTrainingsObservable( button$:Observable<any>, modelPresenter:ModelContainerPresenter, inputPresenter:InputPresenter, modifParamPresenter:ModifParamModelPresenter):Observable<Training>{

    /*  for each button$ events, switch this observable with the one giving the model
     *  when it's imported, then map each model to a training
     *  use share to have a single training for all observers
     */
    return this.trainings$ = button$.pipe(switchMap((event) => 
      zip(
        modelPresenter.importModel(),
        inputPresenter.getInputData()
      )),
        map(  ([model, input]) => ( new TrainingImpl(
          input,
          modifParamPresenter.getModelFitConfig(),
          model)
        )), share()
    ) as Observable<Training>;
  }

  public getTrainings$():Observable<Training>{ return this.trainings$; }


  /**
   * Makes the observable that constructs a training each time the user launches the training
   * Gives it to trainerService so that it can perform the trainings when asked to
   *
   * @param modelPresenter {ModelContainerPresenter} presenter for the modelContainer
   * @param trainButton$ {Subject<any>} Observable that causes the training to be launched
   * @param trainerService {TrainerServiceImpl} 
   * @param inputPresenter {InputContainerPresenter} presenter for the inputContainer
   */
  constructor( modelPresenter:ModelContainerPresenter, trainButton$:Subject<any>, trainerService:TrainerServiceImpl, inputPresenter:InputContainerPresenter, modifParamPresenter:ModifParamModelPresenter) {
    this.modelPresenter = modelPresenter;
    this.inputPresenter = inputPresenter;
    this.modifParamPresenter = modifParamPresenter;
    this.trainings$ = this.createTrainingsObservable(trainButton$, this.modelPresenter, this.inputPresenter, this.modifParamPresenter);
    // give it to trainer service
    trainerService.setTrainings$(this.trainings$);
  }

  ngOnInit() {
  }

}

