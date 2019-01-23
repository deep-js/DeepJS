import { ModelPresenter} from '../model.presenter';
import { Subject } from 'rxjs';

export interface TSModelPresenter extends ModelPresenter {
  getModelDef$():Subject<string>;
  setModelDef(modelDef:string);

}
