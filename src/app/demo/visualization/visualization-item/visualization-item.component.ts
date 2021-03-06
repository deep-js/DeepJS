import { ViewChild, Component, OnInit, Input} from '@angular/core';
import {VisualizationItemPresenter, VisualizationItemComponent, VisualizationComponent, VisualizationContainerPresenter} from '@api/core'; 
import {VisualizationItemPresenterImpl} from './visualization-item.presenter'; 

@Component({
  selector: 'app-visualization-item',
  templateUrl: './visualization-item.component.html',
  styleUrls: ['./visualization-item.component.css']
})

/**
 * Implementation for VisualizationItemComponent
 *
 */
export class VisualizationItemComponentImpl implements VisualizationItemComponent,OnInit {

  presenter:VisualizationItemPresenter;
  @Input() component:VisualizationComponent;
  @Input() container:VisualizationContainerPresenter;
  @ViewChild('instance') instance: VisualizationComponent;
  displayed:boolean = true;
  displayIcons:string[] = ["+", "-"];
  name:String;


  constructor(){
  }

  ngOnInit() {
    this.presenter = new VisualizationItemPresenterImpl(this.container, this.component);	
    this.name = this.container.getComponentName(this.component);

  }

  toggleDisplay(){
    this.displayed=!this.displayed;
  }

}
