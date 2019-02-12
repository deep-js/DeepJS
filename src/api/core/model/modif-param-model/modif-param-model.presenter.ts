import { ModelFitConfig } from '@tensorflow/tfjs';

export interface ModifParamModelPresenter {
  getModelFitConfig():ModelFitConfig;
  setModelDef(string):void;
  getModelDef():string;

}
