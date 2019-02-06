import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';

export interface Training {

  getInputs(): InputData;
  getConfig(): tf.ModelFitConfig;
  getModel(): tf.Model;
  
  setInputs(inputs: InputData):void;
  setConfig(config: tf.ModelFitConfig):void;
  setModel(model: tf.Model):void;
  

}
