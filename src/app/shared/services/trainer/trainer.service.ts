import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs'
import {publish, publishReplay, shareReplay, map, share, switchMap} from 'rxjs/operators'
import {Training} from '@api/core';



// Codes the type of event emitted to the visualisations
export enum TrainEvent {
  TrainBegin,
  TrainEnd,
  EpochBegin,
  EpochEnd,
  BatchBegin,
  BatchEnd
}

// Encapsulates data emitted during Training
export interface TrainData{

  getEpoch():number;
  getBatch():number;
  getEvent():TrainEvent;
  getLoss():number;
  
}

export class TrainData0 {
  private epoch:number;
  private batch:number;
  private event:TrainEvent;
  private loss:number;

  constructor(ev:TrainEvent, ep:number, b:number, l:number){
    this.event = ev;
    this.epoch = ep;
    this.batch = b;
    this.loss = l;
  }

  getEpoch():number{ return this.epoch};
  getBatch():number{ return this.batch };
  getEvent():TrainEvent{ return this.event };
  getLoss():number{ return this.loss };

}


/* We cannot inject an interface
 * we can inject an abstract class
 */
@Injectable({
  providedIn: 'root'
})
export abstract class TrainerService {
  abstract setTrainings$(t:Observable<Training>);
  abstract train(t:Training, observer:Observer<TrainData>);
  abstract getTrainer$():Observable<TrainData>;
  abstract getCurrentTrainings$():Observable<Training>;
}

/* Service used to train a model with particular inputs and parameters
 * Is accessible from any class with Dependency Injection
 * Provides an Observable on the current Training and training events
 * Visualisations can subscribe to these Observables to retrieve their data
 */
@Injectable({
  providedIn: 'root'
})
export class TrainerServiceImpl implements TrainerService {

  private currentTrainings$: Subject<Training>;
  private currentTraining: Training;
  private trainer$: Subject<TrainData>;
  private callbacks: tf.CustomCallbackArgs;


  constructor() {
    this.currentTrainings$ = new Subject<Training>();
    this.trainer$ = new Subject<TrainData>();

  }

  // 
  private setTraining(training:Training){ this.currentTraining = training};

  // get an observable on the data emitted by the current training
  public getTrainer$():Observable<TrainData> { return this.trainer$; }

  // get an observable on the current training
  public getCurrentTrainings$():Observable<Training> { return this.currentTrainings$; }


  /* Set the Observable that will provide a new Training
   * each time the Train button is pressed.
   * From that Observable, make a new one that will emit
   * TrainData while the model is training
   */
  public setTrainings$( trainings$:Observable<Training>){
    //this.currentTrainings$ = trainings$;
    
    /* switchMap allows to create a new Observer of TrainData
     * for each Training coming from the training$ Observer
     * 
     * share is used to share the data between multiple Observer
     * otherwise a train would be called each time a subscription is done
     */
    console.log(trainings$);
    const a$:Subject<Training> = trainings$ as Subject<Training>;

    trainings$.pipe( switchMap((training) =>
            Observable.create(observer => {
              this.setTraining(training);
              this.train(training, observer);
            })
          )).subscribe(this.trainer$ as Subject<any>);
    trainings$.subscribe(this.currentTrainings$ as Subject<Training>);
    /*
    this.trainer$ = new Subject<TrainData>();
    
    const obs$ = trainings$.pipe( switchMap((training) =>
      Observable.create(observer => {
        this.setTraining(training);
        this.train(training, observer);
      })//.pipe(share())
    ));
    obs$.subscribe(this.trainer$ as Subject<TrainData>);*/
  }


  /* Perform the actual training
   * calls fit on current Training object
   * calls next on the observers of the trainer$ Observable
   * each time a new event is emitted (end of an epoch etc)
   */
  train(training:Training, observer:Observer<TrainData>){
    let x = training.getInputs().getXTensor();
    let y = training.getInputs().getYTensor();
    let m = training.getModel() as tf.Sequential;
      let c = training.getConfig() as tf.ModelFitArgs;

    /* These callbacks are called at specific events in the training
     * by fit
     */
    c.callbacks = {
      onTrainBegin: () => {
        // TODO
        // factory for making TrainData
        observer.next(new TrainData0(TrainEvent.TrainBegin, 0, 0, 0));
      },
      onTrainEnd: (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.TrainEnd, epoch, 0, 0));
      },
      onEpochBegin: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.EpochBegin, epoch, logs.batch, logs.loss));
      },
      onEpochEnd: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.EpochEnd, epoch, logs.batch, logs.loss));
      },
      onBatchBegin: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.BatchBegin, epoch, logs.batch, logs.loss));
      },
      onBatchEnd: async (epoch, logs) => {
        observer.next(new TrainData0(TrainEvent.BatchEnd, epoch, logs.batch, logs.loss));
      }

    } as tf.CustomCallbackArgs;

    // Perform training
    m.fit(x, y, c);

  }

}

