import * as tf from '@tensorflow/tfjs';
export interface InputPresenter{
    getXTensor():tf.Tensor;
    getYTensor():tf.Tensor;
}