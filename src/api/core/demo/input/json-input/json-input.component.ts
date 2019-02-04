import {InputComponent} from '../input.component';
import { JsonInputPresenter } from './json-input.presenter';

export interface JsonInputComponent extends InputComponent{
	createInputData();
	getPresenter():JsonInputPresenter;
}