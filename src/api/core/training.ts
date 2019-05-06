import * as tf from '@tensorflow/tfjs';
import {InputData} from '@api/core';

/**
 * Data type for all data of a Training
 * including the dataset, training parameters
 * and the model itself
 */
export interface Training {

  /**
   * Retrieve the dataset
   * @return {InputData} dataset of this training
   */
  getInputs(): InputData;

  /**
   * Obtain training parameters
   * @return {tf.ModelFitArgs} training parameters for this training
   */
  getConfig(): tf.ModelFitArgs;

  /**
   * Obtain the model of this training
   * @return {tf.LayersModel} model of this Training
   */
  getModel(): tf.LayersModel;
  
  /**
   * Set the dataset for this Training
   * @param {InputData} inputs set for this training
   */
  setInputs(inputs: InputData):void;

  /**
   * Set training parameters for this model
   * @param {tf.LayersModelFitConfig} training parameters to be set for this training
   */
  setConfig(config: tf.ModelFitArgs):void;

  /**
   * Set model for this Training
   * @param {tf.LayersModel} model to be set
   */
  setModel(model: tf.LayersModel):void;
  

}
