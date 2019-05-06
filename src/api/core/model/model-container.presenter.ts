import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';
import { ModelPresenter } from './model.presenter';

/**
 * Presenter for ModelContainerComponent
 * handles constructing the model importation component dynamically
 * also handles exporting a Model
 */
export interface ModelContainerPresenter {

  /**
   * Imports the model by calling the current model importation component
   * @return {Observable<tf.LayersModel>} an observable emitting the imported model when it is done importing
   */
  importModel():Observable<tf.LayersModel>;

  setModelPresenter(modelPresenter : ModelPresenter);
}

