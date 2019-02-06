import { InputPresenter } from './input.presenter'

export interface InputComponent{

	getPresenter() : InputPresenter;
	
}