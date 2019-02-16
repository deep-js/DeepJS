import { ViewChild,Component, AfterViewInit, Input} from '@angular/core';
import { ModelContainerPresenterImpl } from './model-container.presenter';
import * as api from '@api/core';

@Component({
  selector: 'app-model-container',
  templateUrl: './model-container.component.html',
  styleUrls: ['./model-container.component.css']
})
/** 
 * Implementation for ModelContainerComponent
 * 
 */
export class ModelContainerComponentImpl implements AfterViewInit, api.ModelContainerComponent {

  // String from the textarea, corresponding to the definition of the model-container in TypeScript
  private presenter:api.ModelContainerPresenter;

  @ViewChild('model') model:api.ModelComponent;
    
  constructor(){
  }

  ngAfterViewInit(){
    this.presenter = new ModelContainerPresenterImpl(this.model.getPresenter());
  }

  getPresenter():api.ModelContainerPresenter{ return this.presenter; }


}
