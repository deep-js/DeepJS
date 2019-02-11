import { fakeAsync, flush } from '@angular/core/testing';

import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs'
import { take, first, last} from 'rxjs/operators';
import { TSModelPresenterImpl } from './ts-model.prensenter';
import * as tf from '@tensorflow/tfjs';

describe('TSModelPresenterImpl', () => {
  let m:TSModelPresenterImpl;
  let model;

  beforeEach(() => {
    m = new TSModelPresenterImpl();
    trainings$ = new Subject<Training>();
    s = new TSModelPresenterImpl();
  });

  it('should have values returned by getCurrentTrainings$ identical to values passed to setTrainings$', () => {
    s.setTrainings$(trainings$);
    trainings$Observer = jasmine.createSpy('trainings$_observer');
    s.getCurrentTrainings$().subscribe(trainings$Observer);
    trainings$.next(training);
    expect(trainings$Observer).toHaveBeenCalledWith(training);

  });

  it('should set the trainer$ Observable so that a train() is called each time a training is provided', () => {
    let trainSpy = spyOn(s, 'train');
    s.setTrainings$(trainings$);
    trainings$Observer = jasmine.createSpy('trainings$_observer');
    s.getTrainer$().subscribe(trainings$Observer);
    /*trainings$Observer1 = jasmine.createSpy('trainings$_observer1');
    s.getCurrentTrainings$().subscribe(trainings$Observer1);*/
    trainings$.next(training);
    expect(s.train).toHaveBeenCalledTimes(1);
  });

  it('should set the trainer$ Observable so that a train() is called only once even if there are multiple observers', () => {
    let trainSpy = spyOn(s, 'train');
    s.setTrainings$(trainings$);
    trainings$Observer = jasmine.createSpy('trainings$_observer');
    s.getTrainer$().subscribe(trainings$Observer);
    let trainings$Observer1 = jasmine.createSpy('trainings$_observer');
    s.getTrainer$().subscribe(trainings$Observer1);
    trainings$.next(training);
    expect(s.train).toHaveBeenCalledTimes(1);
  });

  // TODO : test more events
  it('should emit TrainData in the correct order during training', () => {
    s.setTrainings$(trainings$);
    //let traindataObserver = jasmine.createSpy('traindataObserver');
    s.getTrainer$().pipe(last()).subscribe((trainData) => {
      expect(trainData).toBe(jasmine.objectContaining( event:TrainEvent.TrainBegin, epoch: 0, batch: 0 ));
    });
    s.getTrainer$().pipe(first()).subscribe((trainData) => {
      expect(trainData).toBe(jasmine.objectContaining( event:TrainEvent.TrainEnd, epoch: 0, batch: 0 ));
    });
    trainings$.next(training);
    //expect(traindataObserver).toHaveBeenCalledWith(new TrainData0(TrainEvent.EpochBegin, epoch, jasmine.anything, jasmine.anything));
  });
});
