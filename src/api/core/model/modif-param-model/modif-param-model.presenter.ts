import { ModelFitArgs } from '@tensorflow/tfjs';

export interface ModifParamModelPresenter {
  getModelFitConfig():ModelFitArgs;
  setModelDef(string):void;
  getModelDef():string;

}
