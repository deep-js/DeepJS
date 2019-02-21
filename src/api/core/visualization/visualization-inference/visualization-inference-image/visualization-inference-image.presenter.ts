import { VisualizationInferencePresenter } from '../visualization-inference.presenter';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Presenter for VisualizationInferenceImageComponent 
 * makes the prediction, updates it when needed
 * gets the model and training events from the trainer service
 * gets the inference input from its Component
 */
export interface VisualizationInferenceImagePresenter extends VisualizationInferencePresenter {


  getInferenceOutput$():Observable<string[]>;
  getNbChannels$():Observable<number>; 
  getImageFiles$():Observable<FileList>; 
  getImageDatas$():Observable<ImageData[]>; 

}
