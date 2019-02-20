import {InputPresenter} from '../input.presenter';
import { Subject, BehaviorSubject} from 'rxjs';

/**
 * Presenter for ImageInputComponent
 * converts images into tensors
 */
export interface ImageInputPresenter extends InputPresenter{
  getNbChannels$():Subject<number>; 
  getImageFiles$():Subject<FileList>; 
  getStatus$():Subject<string>; 
}
