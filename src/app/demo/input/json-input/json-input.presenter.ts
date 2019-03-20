import {JsonInputPresenter} from '@api/core/demo/input/json-input';
import { InputData } from '@api/core/inputData';
import { of, Observable } from 'rxjs';
import { InputDataImpl } from '../../../shared/models/inputData';
import * as tf from '@tensorflow/tfjs';
import { JsonInputEmptyError } from 'src/app/shared/exceptions/JsonInputEmptyError';
import { isEmpty } from 'rxjs/operators';

export class JsonInputPresenterImpl implements JsonInputPresenter {

  private input:InputData;
  private json:string;

  createInputData(str:string): boolean {
    var json = JSON.parse(str);
    this.input = new InputDataImpl(tf.tensor(json.x), tf.tensor(json.y));
    return true;
  }

  setJSON(str:string){
    this.json = str;
  }

  getJSON():string {
    return this.json;
  }

  getInputData():Observable<InputData> {
    if (this.json ==  "") {
      throw new JsonInputEmptyError();
    }
    this.createInputData(this.json);
    return of(this.input);
  }

  getDataset():string{
    return this.json;
  }
}
