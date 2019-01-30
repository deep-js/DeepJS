import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';

export interface ModelPresenter {
  import():Observable<tf.Model>;
}

