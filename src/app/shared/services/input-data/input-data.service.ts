import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';


export interface InputDataService {
  getXTensor(): tf.Tensor;
  getYTensor(): tf.Tensor;
}

@Injectable({
  providedIn: 'root'
})

export class InputDataServiceImpl implements InputDataService {
  private x: tf.Tensor;
  private y: tf.Tensor;

  constructor(x: tf.Tensor, y: tf.Tensor) { 
    this.x = x;
    this.y = y;
  }

  getXTensor():tf.Tensor {
    return this.x;
  }

  getYTensor():tf.Tensor {
    return this.y;
  }
}
