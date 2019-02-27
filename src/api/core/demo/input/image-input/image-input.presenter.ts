import {InputPresenter} from '../input.presenter';
import { Subject, BehaviorSubject} from 'rxjs';

/**
 * Presenter for ImageInputComponent
 * Converts a list of image files into tensors
 * To do that it needs the list of files and the number of channels to be kept (defaults to 1)
 * It provides the status of the importation as a String 
 */
export interface ImageInputPresenter extends InputPresenter{
  /**
   * Each value sent to this Observable before importing is set to the number
   * of channels that will be used
   * This mecanism allows the Component and the Presenter to pass data both ways
   * The Presenter gives the Component the initial value to be displayed
   * The Component gives the Presenter the new value when it is changed
   * @return {Subject<number>} the Observable to which the number of channels is sent
   */
  getNbChannels$():Subject<number>; 
  
  /**
   * A FileList object can be sent to this Observable so that its files
   * are used when the importation is triggered
   */
  getImageFiles$():Subject<FileList>; 

  /**
   *
   */
  getStatus$():Subject<string>; 
}
