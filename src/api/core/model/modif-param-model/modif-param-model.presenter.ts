import { ModelPresenter } from '../model.presenter';
import { Subject } from 'rxjs';

export interface ModifParamModelPresenter extends ModelPresenter {
  getModelDef$():Subject<string>;
  setModelDef(modelDef:string);

}
