import { VisualizationInferencePresenter } from '../visualization-inference.presenter';
import { Observable } from 'rxjs';

/**
 * Presenter for VisualizationInferenceJSONComponent 
 * makes the prediction, updates it when needed
 * gets the model and training events from the trainer service
 * gets the inference input from its Component
 */
export interface VisualizationInferenceJSONPresenter extends VisualizationInferencePresenter {

  /**
   * get the Observable to whom JSON inference input from the user is sent
   * this presenter listens to it and uses data coming from it to make the inference
   * @return {Observable<string>} an Observable on the JSON input
   */
  getInferenceInput$():Observable<string>;

  /**
   * get the Observable the result of the prediction
   * this presenter emits results of the inference to it every X period
   * @return {Observable<string>} an Observable on result of predict()
   */
  getInferenceOutput$():Observable<string>;

}
