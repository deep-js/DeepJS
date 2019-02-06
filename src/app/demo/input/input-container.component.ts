import { ViewChild, Component, AfterViewInit } from '@angular/core';
import { InputContainerComponent, InputContainerPresenter } from '@api/core/demo/input';
import { InputContainerPresenterImpl} from './input-container.presenter';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponentImpl implements AfterViewInit, InputContainerComponent {

  presenter:InputContainerPresenter;
  @ViewChild('input') inputComponent;

  constructor() {
  }

  ngAfterViewInit() {
    this.presenter = new InputContainerPresenterImpl(this.inputComponent.getPresenter());
  }

  getPresenter():InputContainerPresenter {
    return this.presenter;
  }

}
