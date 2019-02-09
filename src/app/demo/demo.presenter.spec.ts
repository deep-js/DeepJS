import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, Observable } from 'rxjs';
import * as tf from '@tensorflow/tfjs';

import { DemoPresenterImpl } from './demo.presenter';

describe('DemoPresenterImpl', () => {
  let p: DemoPresenterImpl;
  let model$:Subject<tf.Model> ;
  let modelP ;
  let inputP ;
  let service ;
  let button$:Subject<any>  ;

  beforeEach(() => {
     button$ = new Subject<any>();
     model$ = new Subject<tf.Model>();
     modelP = { import:()=> model$ };
     inputP = { getInputData:()=> {} };
     service = { setTrainings$:() => {}};

  });

  it('should call setTrainings$ on the service when constructed', () => {
    spyOn(service, 'setTrainings$');
    const p = new DemoPresenterImpl(modelP, button$, service, inputP);
    expect(service.setTrainings$).toHaveBeenCalledTimes(1);
  });


});
