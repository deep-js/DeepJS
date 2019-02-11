import { fakeAsync, flush } from '@angular/core/testing';
import * as ts from "typescript";
import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs';
import { take, first, last} from 'rxjs/operators';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as tf from '@tensorflow/tfjs';

describe('TSModelPresenterImpl', () => {
  let m:TSModelPresenterImpl;

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

  it('should emit a model that is the result of evaluating the string given to it', () => {
    let modelDef = "const model = {a:'b', b:1, c:{a:'n', b:0}}";
    let importSpy = jasmine.createSpy('importSpy');
    m.getModelDef$().next(modelDef)
    m.import().subscribe(importSpy);
    expect(importSpy).toHaveBeenCalledWith({a:"b", b:1, c:{a:"n", b:0}});
  });

});
