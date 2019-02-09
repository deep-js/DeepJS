import { ModelPresenter} from '../model.presenter';
import { Subject } from 'rxjs';

export interface JSONModelPresenter extends ModelPresenter {
  getModelFile$():Subject<FileList>;

}
