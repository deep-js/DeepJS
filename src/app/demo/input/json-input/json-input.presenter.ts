import {JsonInputPresenter} from '@api/core/demo/input/json-input';
import { InputData } from '@api/core/inputData';
import { InputDataImpl } from '../../../shared/models/inputData';
import * as tf from '@tensorflow/tfjs';

export class JsonInputPresenterImpl implements JsonInputPresenter {

    private input:InputData;

    createInputData(json: any) {
        this.input = new InputDataImpl(tf.tensor(json["x"]), tf.tensor(json["y"]));
      }
}