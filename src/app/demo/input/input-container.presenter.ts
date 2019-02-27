import{InputPresenter, InputContainerPresenter} from '@api/core/demo/input';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{InputData} from '@api/core';
import * as tf from '@tensorflow/tfjs';
export class InputContainerPresenterImpl implements InputContainerPresenter{

  inputPresenter:InputPresenter;

  constructor(){
  }

  setInputPresenter(inputPresenter:InputPresenter){
    this.inputPresenter = inputPresenter;
  }

  /* TODO : put it in a service
   * Evaluates the TypeScript string to retrieve the tf.Model object
   *
   *
   * Evaluating typescript code in the browser is a pain
   * mainly because modules (here tensorflow) must be available
   * at runtime
   * For that purpose tensorflow's source is added to "scripts"
   * in angular.json so that it is available when the code is
   * evaluated
   * #uglyhack
   *
  private evaluate(s:string) {
    // Add model at the end so that it is returned by eval
    let result = ts.transpile(s+";model;");
    return eval(result);
  }*/

  getInputData():Observable<InputData> {
    return this.inputPresenter.getInputData();
  }
}
