import * as tf from '@tensorflow/tfjs';

export interface ModelPresenter {
  import():tf.Model;
}

