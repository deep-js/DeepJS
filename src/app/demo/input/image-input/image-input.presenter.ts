import {ImageInputPresenter,InputData} from '@api/core';
import { Observable, from, Subject, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';
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
    from(readImageData(file)).pipe(
      map( (imageData) => tf.fromPixels(imageData as ImageData)),
      map( (t) => tf.split(t,3,2)[0])
    )
    return null;

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
    const data = this.getTensors(this.imageFiles[0]);
    //  data.then((d) => console.log(d));

    return null;
  }
}
