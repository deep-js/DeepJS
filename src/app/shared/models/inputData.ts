import * as tf from '@tensorflow/tfjs';
import { InputData } from '@api/core/inputData';

export class InputDataImpl implements InputData {
  private x: tf.Tensor;
  private y: tf.Tensor;
  private labels:string[];

  constructor(x: tf.Tensor, y: tf.Tensor) {
    this.x = x;
    this.y = y;
  }

  getXTensor(): tf.Tensor {
    return this.x;
  }

  getYTensor(): tf.Tensor {
    return this.y;
  }

  setLabels(labels:string[]){
    this.labels = labels;
  }

  getLabels():string[]{
    return this.labels;
  }
}
