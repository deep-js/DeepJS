import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';
import { InputPresenter } from './input.presenter';
export interface InputContainerPresenter{
    getInputData():InputData;
    setInputPresenter(inputPresenter:InputPresenter);
}
