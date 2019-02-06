import{InputPresenter} from '@api/core/demo/input';
import * as api from '@api/core';

export class InputPresenterImpl implements InputPresenter{


	private inputPresenter:api.InputPresenter;

	constructor(inputPresenter:api.InputPresenter){
		this.inputPresenter = inputPresenter;
	}


}