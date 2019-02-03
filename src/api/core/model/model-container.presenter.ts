import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';

export interface ModelContainerPresenter {
  import():Observable<tf.Model>;
}

