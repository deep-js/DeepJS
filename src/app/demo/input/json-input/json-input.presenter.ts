import {JsonInputPresenter} from '@api/core/demo/input/json-input';

export class JsonInputPresenterImpl implements JsonInputPresenter{
	

	constructor(){

	}

	changeData1():string{
		return "json1 modified by presenter JSON";
	}

	changeData2():string{
		return "json2 modified by presenter JSON";
	}

}