import * as tf from '@tensorflow/tfjs';

export interface InputData {
  getXTensor(): tf.Tensor;
  getYTensor(): tf.Tensor;
  setLabels(labels:string[]);
  getLabels():string[];

}
