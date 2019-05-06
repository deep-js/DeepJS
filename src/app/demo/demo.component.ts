import {AfterViewInit, ViewChild, Component, OnInit, ElementRef} from '@angular/core';
import {Subject, fromEvent} from 'rxjs';
import {DemoComponent, DemoPresenter, InputContainerComponent, JsonInputComponent} from '@api/core/demo';
import {ModelContainerComponent, ModelComponent, ModelPresenter, ModifParamModelComponent} from '@api/core/model';
import {DemoPresenterImpl} from './demo.presenter';
import {TrainerServiceImpl} from '../shared/services/trainer/trainer.service';
import {InputData} from '@api/core/inputData';

/** Implementation of DemoComponent
 *  Constructs its presenter and gives it an Observable that watches
 *  the user input responsible for starting the training
 */
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponentImpl implements AfterViewInit, DemoComponent {

  @ViewChild('input') input: InputContainerComponent;

  @ViewChild('modelContainer') modelContainer: ModelContainerComponent;

  // DOM element triggering the training
  @ViewChild('trainButton') trainButton: ElementRef;

  @ViewChild('modifParam') modifParam: ModifParamModelComponent;
  // Presenter for this component
  private demo: DemoPresenter;

  private errorDiv: String;
  private Arr = Array;
  private nb = 1;
  public names: string[] = ['tfjs.dense', 'tfjs.conv2d', 'tfjs.conv1d', 'tfjs.flatten' ]
  public namesTSP: string[] = ['TSP.model dense', 'TSP conv2d', 'TSP conv1d', 'TSP flatten' ];
  public selected: string;



  // Inject the trainer service to give to the presenter
  constructor(private trainerService: TrainerServiceImpl) {

  }
  private convert(names: string): string {

      return this.namesTSP[names.indexOf(name)];
  }

  private add() {
    this.nb++;
    this.convert(this.selected);
  }



  ngAfterViewInit() {
    const a$ = new Subject<any>();
    fromEvent(this.trainButton.nativeElement, 'click').subscribe(a$);
    // Presenter takes all child component's presenters as arguments as well as the trainer service
    this.demo = new DemoPresenterImpl(this.modelContainer.getPresenter(), a$, this.trainerService, this.input.getPresenter(), this.modifParam.getPresenter());
    this.demo.getError$().subscribe((s) => this.errorDiv = s);
  }

}
