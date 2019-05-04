import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { flush, fakeAsync, tick } from '@angular/core/testing';
import {TrainingImpl} from '../shared/models/training';
import { of, BehaviorSubject, Subject, Observable } from 'rxjs';
import * as tf from '@tensorflow/tfjs';

import { DemoPresenterImpl } from './demo.presenter';

describe('DemoPresenterImpl', () => {
  let p: DemoPresenterImpl;
  let model$:Observable<tf.Model> ;
  let trainParam;
  let modelP, model;
  let inputP, input$, input;
  let paramP, param;
  let service ;
  let button$:Subject<any>  ;
  let trainings$Observer;

  beforeEach(() => {
    button$ = new Subject<any>();
    trainParam = { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true };
    model = tf.sequential({layers: [tf.layers.dense({units: 1, inputShape: [3]})]});
    model$ = of(model);
    modelP = { import:()=> model$ };
    input = {x: tf.tensor([[0,0,0], [0,1,0]]), y: tf.tensor([[0.5], [0.2]]) };
    input$ = new BehaviorSubject(input);
    inputP = { getInputData: () => input$ };
    param = { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true };
    paramP = { getModelFitConfig:()=> param };
    trainings$Observer = jasmine.createSpy('trainings$_observer');
    service = { trainings$: null, setTrainings$:(trainings$) => {
      this.trainings$ = trainings$;
    }};
    spyOn(service, 'setTrainings$');
    p = new DemoPresenterImpl(modelP, button$, service, inputP, paramP);
    p.getTrainings$().subscribe(trainings$Observer);

  });

  it('should call setTrainings$ on the service when constructed', () => {
    expect(service.setTrainings$).toHaveBeenCalledTimes(1);
  });

  it('should not call setTrainings$ on the service with null when constructed', () => {
    expect(service.setTrainings$).not.toHaveBeenCalledWith(null);
  });

/*  it('should call setTrainings$ with an Observable of Trainings having the properties returned by each presenter given in the constructor', () => {
    button$.next(0);  // equivalent to clicking on the button
    expect(trainings$Observer).toHaveBeenCalledWith(new TrainingImpl(input, trainParam, model));
  });*/

});
