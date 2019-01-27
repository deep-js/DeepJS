import { ModelPresenter} from '../model.presenter';
import { Subject } from 'rxjs';

export interface JSONModelPresenter extends ModelPresenter {
  getModelDef$():Subject<string>;
  setModelDef(modelDef:string);

}
