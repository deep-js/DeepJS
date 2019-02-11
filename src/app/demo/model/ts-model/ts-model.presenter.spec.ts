import { fakeAsync, flush } from '@angular/core/testing';
import * as ts from "typescript";
import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs';
import { take, first, last} from 'rxjs/operators';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as tf from '@tensorflow/tfjs';

describe('TSModelPresenterImpl', () => {
  let m:TSModelPresenterImpl;
  let model;

  beforeEach(() => {
    m = new TSModelPresenterImpl();
  });

  it('should call transpile when import is called', () => {
    let tsSpy = spyOn(ts, 'transpile');
    m.import();
    expect(tsSpy).toHaveBeenCalled();

  });

  it('should call transpile with the string given to the observable', () => {
    let tsSpy = spyOn(ts, 'transpile');
    m.getModelDef$().next("var a = 1")
    m.import();
    expect(tsSpy).toHaveBeenCalledWith("var a = 1;model;");

  });
});
