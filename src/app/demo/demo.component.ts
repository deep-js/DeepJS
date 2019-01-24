import { ViewChild, Component, OnInit, ElementRef} from '@angular/core';
import { fromEvent } from 'rxjs';
import {DemoComponent, DemoPresenter} from '@api/core/demo';
import {ModelComponent, ModelPresenter} from '@api/core/model';
import {DemoPresenterImpl} from './demo.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponentImpl implements OnInit, DemoComponent {

  // TODO : dynamically choose modelcomponent

  @ViewChild('model') model:ModelComponent;
  @ViewChild('trainButton') trainButton: ElementRef;
  private demo:DemoPresenter;

  constructor(private trainerService:TrainerServiceImpl){
    
  }

  ngOnInit() {
    console.log(this.model);
    this.demo = new DemoPresenterImpl(this.model.getPresenter(),fromEvent(this.trainButton.nativeElement, 'click'), this.trainerService);

  }

}
