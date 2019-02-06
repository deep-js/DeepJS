import {InputPresenter} from '../input.presenter';
import * as tf from '@tensorflow/tfjs';

export interface JsonInputPresenter extends InputPresenter{
    createInputData(str: string): boolean;
    getYTensor():tf.Tensor;
    getXTensor():tf.Tensor;
}