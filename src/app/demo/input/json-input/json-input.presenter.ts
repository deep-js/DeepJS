import {JsonInputPresenter} from '@api/core/demo/input/json-input';
import { InputData } from '@api/core/inputData';
import { InputDataImpl } from '../../../shared/models/inputData';
import * as tf from '@tensorflow/tfjs';

export class JsonInputPresenterImpl implements JsonInputPresenter {

  private input:InputData;
  private json:string;

  createInputData(str:string): boolean {
    var json = JSON.parse(str);
    this.input = new InputDataImpl(tf.tensor(json.x), tf.tensor(json.y));
    return true;
  }

  setJSON(str:string){
    this.json = str;
  }

  getInputData():InputData {
    this.createInputData(this.json);
    return this.input;
  }

}
