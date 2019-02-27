import {InputPresenter} from '../input.presenter';
import {InputData} from '@api/core';
import * as tf from '@tensorflow/tfjs';

export interface JsonInputPresenter extends InputPresenter{
  createInputData(str: string): boolean;
  setJSON(str:string);
  getDataset():string;
  getJSON():string;
}
