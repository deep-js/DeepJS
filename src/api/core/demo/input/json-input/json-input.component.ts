import {InputComponent} from '../input.component';
import { InputDataService } from 'src/app/shared/services/input-data/input-data.service';

export interface JsonInputComponent extends InputComponent{
	createInputData():InputDataService;
}