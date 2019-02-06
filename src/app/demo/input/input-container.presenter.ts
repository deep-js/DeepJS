import{InputPresenter, InputContainerPresenter} from '@api/core/demo/input';
import{InputData} from '@api/core';
import * as tf from '@tensorflow/tfjs';
export class InputContainerPresenterImpl implements InputContainerPresenter{

  inputPresenter:InputPresenter;

  constructor(inputPresenter:InputPresenter){
    this.inputPresenter = inputPresenter;
  }

  getInputData():InputData {
    return this.inputPresenter.getInputData();
  }
}
