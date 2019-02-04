import {InputPresenter} from '../input.presenter';
import { InputData } from '../../../inputData';
export interface JsonInputPresenter extends InputPresenter{
    createInputData(json: any);
}