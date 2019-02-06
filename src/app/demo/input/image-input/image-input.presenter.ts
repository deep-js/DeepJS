import {ImageInputPresenter} from '@api/core/demo/input/image-input';

export class ImageInputPresenterImpl implements ImageInputPresenter{

	public changeData1():string{
		console.log("test");
		let ret : string = "image1 modified by presenter IMAGE"
		return ret;
	}

	public changeData2():string{
		return "image2 modified by presenter IMAGE";
	}
	
}