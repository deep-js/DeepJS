import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/* Presenter for JSONModelComponent
 * Performs the actual import from Typescript code to Object tf.Model
 */
export class JSONModelPresenterImpl implements api.JSONModelPresenter{

  private modelDef: string;
  private modelDef$: Subject<string>;
  private training_def: string;
  private model:tf.Model;


  constructor() {

    // Default value for the model definition
    this.modelDef="{\"model\":{\"class_name\":\"Sequential\",\"config\":[{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense15\",\"trainable\":true,\"batch_input_shape\":[null,2],\"dtype\":\"float32\"}},{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense16\",\"trainable\":true}},{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense17\",\"trainable\":true}},{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense18\",\"trainable\":true}},{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense19\",\"trainable\":true}},{\"class_name\":\"Dense\",\"config\":{\"units\":20,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense20\",\"trainable\":true}},{\"class_name\":\"Dense\",\"config\":{\"units\":3,\"activation\":\"relu\",\"use_bias\":true,\"kernel_initializer\":{\"class_name\":\"VarianceScaling\",\"config\":{\"scale\":1,\"mode\":null,\"distribution\":null,\"seed\":null}},\"bias_initializer\":{\"class_name\":\"Zeros\",\"config\":{}},\"kernel_regularizer\":null,\"bias_regularizer\":null,\"activity_regularizer\":null,\"kernel_constraint\":null,\"bias_constraint\":null,\"name\":\"dense_Dense21\",\"trainable\":true}}],\"keras_version\":\"tfjs-layers 0.8.2\",\"backend\":\"tensor_flow.js\"}, \"compile_options\":{\"loss\":\"meanSquaredError\",\"optimizer\":{\"learningRate\":0.1,\"c\":{\"isDisposedInternal\":false,\"shape\":[],\"dtype\":\"float32\",\"size\":1,\"strides\":[],\"dataId\":{},\"id\":60,\"rankType\":\"0\"},\"momentum\":0.9,\"useNesterov\":false,\"m\":{\"isDisposedInternal\":false,\"shape\":[],\"dtype\":\"float32\",\"size\":1,\"strides\":[],\"dataId\":{},\"id\":61,\"rankType\":\"0\"},\"accumulations\":{}}}}";
    


    // Make a Subject (kind of Observable) on the TypeScript string
    this.modelDef$ = new BehaviorSubject<string>(this.modelDef);
    
    // Subscribe to it so we get updates from the Component
    // (the Component does a next on it at each key press)
    // Skip ourself sending the first string
    this.modelDef$.pipe( skip(1) ).subscribe(s => this.modelDef=s)
  }

  // Imporjson tf.Model object from TypeScript string
  import():tf.Model {
    const json = JSON.parse(this.modelDef);
    const model:tf.Model=  Object.assign(new tf.Model({inputs:[], outputs:[], name:""}), json.model as tf.Model);
    json.compile_options.optimizer = Object.assign(new tf.MomentumOptimizer(0,0,false), json.compile_options.optimizer);
    model.compile(json.compile_options);
    return model;
      
  }

  // Provide the Observable on the Typescript string
  getModelDef$():Subject<string> { return this.modelDef$; }
    
  // TODO : obsolete ?
  setModelDef(s:string):void { this.modelDef = s; }

}
