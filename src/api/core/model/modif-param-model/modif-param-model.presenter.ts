import { ModelFitConfig } from '@tensorflow/tfjs';

export interface ModifParamModelPresenter {
  getModelFitConfig():ModelFitConfig;
  setModelFitConfig():void;

}
