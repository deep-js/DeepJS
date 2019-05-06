import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';
import { InputPresenter } from './input.presenter';
import {Observable} from 'rxjs';
export interface InputContainerPresenter{
  getInputData():Observable<InputData>;
  setInputPresenter(inputPresenter:InputPresenter);
  exportJson();
  getDataset():string;
}
