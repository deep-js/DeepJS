import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';

/**
 * Presenter for ModelComponent
 * is used by it to import the model when asked by the user
 */
export interface ModelPresenter {
  /**
   * Triggers importation of the model with data provided by ModelComponent
   * and returns it when it is imported
   * @return {Observable<tf.Model>} an observable emitting the model when it is done importing
   */
  import():Observable<tf.Model>;
}

