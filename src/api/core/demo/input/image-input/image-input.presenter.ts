import {InputPresenter} from '../input.presenter';
import { Subject, BehaviorSubject} from 'rxjs';

/**
 * Presenter for ImageInputComponent
 * converts images into tensors
 */
export interface ImageInputPresenter extends InputPresenter{
  getImageFiles$():Subject<FileList>; 
  getStatus$():Subject<string>; 
}
