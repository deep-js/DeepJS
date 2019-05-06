import * as tf from '@tensorflow/tfjs';
import * as json from "typescript";
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Subject, BehaviorSubject} from 'rxjs';
import { skip} from 'rxjs/operators';

import * as api from '@api/core';

/**
 * Implementation for JSONModelPresenter
 * Uses tfjs to load model from files exported with tensorflow
 * Tensoflow exports 2 files for a model, a .json file for the model itself
 * and a .weight.bin file for the weights
 * Retrieves files selected by JSONModelComponent via a Subject
 */
export class JSONModelPresenterImpl implements api.JSONModelPresenter{

  private modelFile: FileList;
  private modelFile$: Subject<FileList>;
  private model:tf.LayersModel;


  constructor() {

    // Make a Subject (kind of Observable) on the file name
    this.modelFile$ = new BehaviorSubject<FileList>(this.modelFile);

    // Subscribe to it so we get updates from the Component
    this.modelFile$.subscribe(s => this.modelFile=s)
  }

  // Imports tf.LayersModel object from files
  import():Observable<tf.LayersModel>{
    return from(tf.loadLayersModel(
      tf.io.browserFiles(
        [this.sortTypes(this.modelFile)[0]]
      )
    ).then( model => { 
      // TODO : ask for compile options, way to integrate it into json ?
      model.compile({loss: 'meanSquaredError', optimizer: tf.train.momentum(0.1,0.9)});
      return model;
    })) as Observable<tf.LayersModel>;
  }

  // tfjs expects the .json file first, then the .weight.bin
  // Files given to this presenter as a FileList are not sorted
  // this function sorts in the order they are exptected
  private sortTypes(l:FileList):File[]{
    const a:File[] = [ l[0], l[1] ];
    return a.sort((a,b) => (a.name.endsWith("bin") ? 1 : -1));
  }

  // Provide an Observable on the file name
  getModelFile$():Subject<FileList> { return this.modelFile$; }

}
