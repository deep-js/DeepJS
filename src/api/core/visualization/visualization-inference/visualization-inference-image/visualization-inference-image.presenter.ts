import { VisualizationInferencePresenter } from '../visualization-inference.presenter';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * Presenter for VisualizationInferenceImageComponent 
 * Converts the given images to tensors, makes a prediction on them
 * using the current model
 * Provides results of the prediction as a string
 */
export interface VisualizationInferenceImagePresenter extends VisualizationInferencePresenter {

  /**
   * get an observable to which prediction results are emitted
   * as Strings
   * @return {Observable<string[]>} the observable on which prediction results are emitted 
   */
  getInferenceOutput$():Observable<string[]>;

  /**
   * Each value sent to this Observable before importing the images used as inference must be
   * set as the number of channels that will be used for importing the next set of images
   * The number of channels is the number of channels that will be kept after importing
   * , it is not the original number of channels although they can be the same
   * This mecanism allows the Component and the Presenter to pass data both ways
   * The Presenter gives the Component the initial value to be displayed
   * The Component gives the Presenter the new value when it is changed
   * @return {Subject<number>} the Observable to which the number of channels is sent
   */
  getNbChannels$():Observable<number>; 

  /**
   * FileList objects emitted to this Observable are imported and a 
   * prediction is made on the resulting tensors 
   * @return {Observable<FileList>} Observable FileLists that this presenter listens to 
   * in order to import files emitted to it
   */
  getImageFiles$():Observable<FileList>; 

  /** 
   * Gives ImageData for each image file given to the Observable returned 
   * by getImageFiles$()
   * The result can be used to display these images
   * @return {Observable<ImageData[]>} Observable to which ImageDatas of the imported files
   * are  emitted
   */ 
  getImageDatas$():Observable<ImageData[]>; 

}
