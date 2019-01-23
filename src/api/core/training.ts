import * as tf from '@tensorflow/tfjs';

export interface Training {

  getInputs(): any;
  getConfig(): tf.ModelFitConfig;
  getModel(): tf.Model;
  
  setInputs(inputs: any):void;
  setConfig(config: tf.ModelFitConfig):void;
  setModel(model: tf.Model):void;
  

}
