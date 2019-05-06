import { ModelPresenter} from '../model.presenter';
import { Subject } from 'rxjs';

/**
 * Presenter for JSONModelComponent
 * Loads model from JSON definition
 */
export interface JSONModelPresenter extends ModelPresenter {

  /**
   * Retrieve Subject on FileList 
   * This Subject is listened to by this presenter,
   * every FileList emitted to it will be the one imported 
   * when import is called
   */
  getModelFile$():Subject<FileList>;

}
