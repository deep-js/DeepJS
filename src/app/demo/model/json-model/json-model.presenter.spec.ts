import { fakeAsync, flush } from '@angular/core/testing';
import * as ts from "typescript";
import {BehaviorSubject, Subject, ConnectableObservable, Observable, Observer} from 'rxjs';
import { take, first, last} from 'rxjs/operators';
import { JSONModelPresenterImpl } from './json-model.presenter';
import * as tf from '@tensorflow/tfjs';

describe('JSONModelPresenterImpl', () => {
  let m:JSONModelPresenterImpl;

  beforeEach(() => {
    m = new JSONModelPresenterImpl();
  });

  it('should compile the model after importing it', () => {
    let modelSpy = jasmine.createSpy('modelSpy');
    m.import().first().subscribe( model => {
    	expect(model.isCompiled).toHaveBeenCalled();
    });
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
