import { VisualizationInferencePresenter } from '../visualization-inference.presenter';
import { Observable } from 'rxjs';

export interface VisualizationInferenceJSONPresenter extends VisualizationInferencePresenter {

  getInferenceInput$():Observable<string>;
  getInferenceOutput$():Observable<string>;

}
