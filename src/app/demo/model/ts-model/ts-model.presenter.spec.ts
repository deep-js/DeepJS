import { fakeAsync, flush } from '@angular/core/testing';
import * as ts from "typescript";
import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs';
import { take, first, last} from 'rxjs/operators';
import { TSModelPresenterImpl } from './ts-model.presenter';
import * as tf from '@tensorflow/tfjs';

// TODO : test that exceptions are correctly thrown/catched on invalid inputs
describe('TSModelPresenterImpl', () => {
  let m:TSModelPresenterImpl;
  let defaultModel:Subject<string>;

  beforeEach(() => {
    defaultModel = new BehaviorSubject<string>("");
    m = new TSModelPresenterImpl(defaultModel);
  });

  it('should call transpile when import is called', () => {
    let tsSpy = spyOn(ts, 'transpile');
    m.import();
    expect(tsSpy).toHaveBeenCalled();

  });

  it('should call transpile with the string given to the observable', () => {
    let tsSpy = spyOn(ts, 'transpile');
    // testing with random ts string here
    m.getModelDef$().next("var a = 1")
    m.import();
    expect(tsSpy).toHaveBeenCalledWith("var a = 1;model;");
  });

  it('should emit a model that is the result of evaluating the string given to it', () => {
    // not testing with an actual model definition because
    // it requires to have tfjs available at test runtime
    // which I could not figure out
    // just tests that an object affected to the 'model' variable is returned by import
    let modelDef = "const model = {a:'b', b:1, c:{a:'n', b:0}}";
    let importSpy = jasmine.createSpy('importSpy');
    m.getModelDef$().next(modelDef)
    m.import().subscribe(importSpy);
    expect(importSpy).toHaveBeenCalledWith({a:"b", b:1, c:{a:"n", b:0}});
  });

});
