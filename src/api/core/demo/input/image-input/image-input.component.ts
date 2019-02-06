import {InputComponent} from '../input.component'
import {ImageInputPresenter} from './image-input.presenter';

export interface ImageInputComponent extends InputComponent{
	getPresenter() : ImageInputPresenter;
}