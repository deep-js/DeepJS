import { ModelPresenter} from '../model.presenter';
import { Subject } from 'rxjs';

/**
 * Presenter for TSModelComponent
 * imports a model from a Typescript string by evaluating it
 */
export interface TSModelPresenter extends ModelPresenter {
   /**
   * Provides a Subject on the Typescript string
   * This Subject can be listened to in order to get the default model 
   * definition from this presenter  or the Typescript model definition 
   * can be emitted to it to set it as the one being imported by this presenter
   * @return {Subject<string>} a Subject on the TypeScript model definition
   */
  getModelDef$():Subject<string>;

  /**
   * Set Model definition manually
   * @deprecated
   */
  setModelDef(modelDef:string);

  /**
   * TODO
   */
  export();

}
