import {ImageInputPresenter,InputData} from '@api/core';
import { combineLatest, Observable, from, Subject, BehaviorSubject} from 'rxjs';
import { take,  map } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';
import { InputDataImpl } from '../../../shared/models/inputData';
import readImageData from 'read-image-data';

export class ImageInputPresenterImpl implements ImageInputPresenter{
  private imageFiles: FileList;
  private imageFiles$: Subject<FileList>;
  private model:tf.Model;


  constructor() {

    // Make a Subject (kind of Observable) on the file name
    this.imageFiles$ = new BehaviorSubject<FileList>(this.imageFiles);

    // Subscribe to it so we get updates from the Component
    this.imageFiles$.subscribe(s => this.imageFiles=s)
  }

  // Imports tf.Model object from files


  // Provide an Observable on the file name
  getImageFiles$():Subject<FileList> { return this.imageFiles$; }

  getTensors(file:File):Observable<tf.Tensor> {
    return from(readImageData(file)).pipe(
      map( (imageData) => tf.fromPixels(imageData as ImageData)),
      map( (t) => tf.split(t,3,2)[0]),
      take(1)
    );

  }



            /*const url = URL.createObjectURL(file);           // create an Object URL
    const img = new Image();                         // create a temp. image object

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;  

    URL.revokeObjectURL(this.src);             // free memory held by Object URL
    c.getContext("2d").drawImage(this, 0, 0);  // draw image onto canvas (lazy method™)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, w,h);
    const data = context.getImageData(0, 0, w, h)
    return data;*/



  getInputData(): Observable<InputData> {
    console.log(this.imageFiles);
    const files = Array.from(this.imageFiles);
    const tensors$ = files.map( (file) => this.getTensors(file));
    return combineLatest(tensors$).pipe(
      map( (tensors) => (new InputDataImpl(tf.stack(tensors), tf.zeros([tensors.length,10]))))
    );
  }
}
