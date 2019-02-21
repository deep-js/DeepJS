import {ImageInputPresenter,InputData} from '@api/core';
import { combineLatest, Observable, from, Subject, BehaviorSubject} from 'rxjs';
import { tap, take,  map, skip } from 'rxjs/operators';
import * as tf from '@tensorflow/tfjs';
import { InputDataImpl } from '../../../shared/models/inputData';
import readImageData from 'read-image-data';


export class ImageInputPresenterImpl implements ImageInputPresenter{
  private imageFiles: FileList;
  private imageFiles$: Subject<FileList>;
  private status$: Subject<string>;
  private nbImported:number;
  private nbChannels:number;
  private nbChannels$: Subject<number>;
  private labels: { [key:string]:number; };
  private nbLabels:number;



  constructor() {

    // Make a Subject (kind of Observable) on the file name
    this.imageFiles$ = new BehaviorSubject<FileList>(this.imageFiles);
    this.imageFiles$.subscribe(s => this.imageFiles=s);

    this.status$ = new BehaviorSubject<string>("");

    this.nbChannels = 1;
    this.nbChannels$ = new BehaviorSubject<number>(this.nbChannels);
    this.nbChannels$.pipe(skip(1)).subscribe(n => this.nbChannels=n);

    this.nbImported = 0, this.nbLabels = 0, this.labels = {};
  }

  // Provide an Observable on the file name
  getImageFiles$():Subject<FileList> { return this.imageFiles$; }

  getNbChannels$():Subject<number> { return this.nbChannels$; }

  getStatus$():Subject<string> { return this.status$; }

  private getTensors(file:File):Observable<tf.Tensor> {
    return from(readImageData(file)).pipe(
      map( (imageData) => tf.fromPixels(imageData as ImageData, this.nbChannels)),
      tap( (tensor) => this.updateStatus(file.webkitRelativePath)),
      take(1)
    );

  }

  private getLabel(file:File):tf.Tensor {
    const dirs = file.webkitRelativePath.split("/");
    const label = dirs[dirs.length-2];
    if(this.labels[label] == undefined){
      this.labels[label]=this.nbLabels++;
    }
    return tf.tensor([this.labels[label]], [1], 'int32');
  }

  private updateStatus(filePath:string){
    this.status$.next(++this.nbImported+"/"+this.imageFiles.length+" "+filePath);
  }

  private resetStatus(){
    this.status$.next("");
    this.nbImported = 0, this.nbLabels = 0, this.labels = {};
    console.log(tf.memory());
  }

  getInputData(): Observable<InputData> {
    console.log(this.imageFiles);
    const files = Array.from(this.imageFiles);
    console.log(tf.memory());
    const tensors$ = files.map( (file) => this.getTensors(file));
    const labels = tf.tidy( () => {
      return tf.concat(
        files.map( (file) => this.getLabel(file))    // have to get all labels before doing the oneHot,
        // because only then is the nb of labels known
        .map((label) => tf.oneHot(label,this.nbLabels)))
    });
    console.log(this.labels);
    // to get json from an image
    // this.getTensors(files[0]).subscribe((t) => console.log(JSON.stringify(t.arraySync()))));
    // console.log(files[0].webkitRelativePath);console.log(this.getLabel(files[0]).toString());
    return combineLatest(tensors$).pipe(
      tap( (tensors) => console.log(tf.memory())),
      map( (tensors) => {
        const a = tf.stack(tensors);
        tf.dispose(tensors);
        return new InputDataImpl(a, labels);
      }),
      //map( (t) => tf.split(t,3,3)[0]),  // function inputed by user
      tap( (inputdata) => this.resetStatus()) 
    );
  }
}
