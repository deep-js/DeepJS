import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';
import {Observable} from 'rxjs';
export interface InputPresenter{
  getInputData():Observable<InputData>;
  getDataset():string;
}
