import { fakeAsync, flush } from '@angular/core/testing';

import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs'
import { take, first, last} from 'rxjs/operators';
import { TrainEvent, TrainData0, TrainerServiceImpl } from './trainer.service';
import {Training} from '@api/core';
import {InputDataImpl} from '../../models/inputData';
import {TrainingImpl} from '../../models/training';
import * as tf from '@tensorflow/tfjs';

describe('TrainerServiceImpl', () => {
  let trainings$, training;
  let s:TrainerServiceImpl;
  let trainParam;
  let model;
  let input;
  let trainings$Observer;

  beforeEach(() => {
    trainParam = { batchSize: 1, epochs: 1, validationSplit: 0};
    model = tf.sequential({layers: [tf.layers.dense({units: 1, inputShape: [3]})]});
    model.compile({loss: 'meanSquaredError', optimizer: tf.train.momentum(0.1,0.9)});
    input = new InputDataImpl(tf.tensor([[0,1,0]]), tf.tensor([[0.2]]));
    training = new TrainingImpl(input, trainParam, model);
    trainings$ = new Subject<Training>();
    s = new TrainerServiceImpl();
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
    s.getTrainer$().pipe(first()).subscribe((trainData) => {
    expect(trainData).toBe(jasmine.objectContaining({ event:TrainEvent.TrainBegin, epoch: 0, batch: 0 }) as any);
    });
    s.getTrainer$().pipe(last()).subscribe((trainData) => {
    expect(trainData).toBe(jasmine.objectContaining({ event:TrainEvent.TrainEnd, epoch: 0, batch: 0 }) as any);
    });
    trainings$.next(training);
    //expect(traindataObserver).toHaveBeenCalledWith(new TrainData0(TrainEvent.EpochBegin, epoch, jasmine.anything, jasmine.anything));
  });
});
