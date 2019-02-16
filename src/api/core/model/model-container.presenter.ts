import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';

/**
 * Presenter for ModelContainerComponent
 * handles constructing the model importation component dynamically
 * also handles exporting a Model
 */
export interface ModelContainerPresenter {

  /**
   * Imports the model by calling the current model importation component
   * @return {Observable<tf.Model>} an observable emitting the imported model when it is done importing
   */
  import():Observable<tf.Model>;
}

