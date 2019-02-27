import { VisualizationInferencePresenter } from '../visualization-inference.presenter';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Presenter for VisualizationInferenceImageComponent 
 * Converts the given images to tensors, makes a prediction on them
 * using the current model
 * It then provides the results as a string
 */
export interface VisualizationInferenceImagePresenter extends VisualizationInferencePresenter {

  /**
   * get an observable to which prediction results are emitted
   * 
   */
  getInferenceOutput$():Observable<string[]>;
  getNbChannels$():Observable<number>; 
  getImageFiles$():Observable<FileList>; 
  getImageDatas$():Observable<ImageData[]>; 

}
