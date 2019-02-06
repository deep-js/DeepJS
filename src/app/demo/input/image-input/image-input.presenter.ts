import {ImageInputPresenter} from '@api/core/demo/input/image-input';
import * as tf from '@tensorflow/tfjs';

export class ImageInputPresenterImpl implements ImageInputPresenter{
    getXTensor():tf.Tensor {
        return null;
    }
    getYTensor(): tf.Tensor {
        return null;
    }
}