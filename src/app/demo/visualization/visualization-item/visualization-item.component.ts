import { Component, OnInit, Input} from '@angular/core';
import {VisualizationItemPresenter, VisualizationItemComponent, VisualizationComponent} from '@api/core'; 
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


  constructor( ){
    this.presenter = new VisualizationItemPresenterImpl();	
  }

  ngOnInit() {

  }

}
