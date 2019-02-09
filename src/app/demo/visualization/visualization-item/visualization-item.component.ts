import { Component, OnInit } from '@angular/core';
import {VisualizationItemPresenter, VisualizationItemComponent} from '@api/core'; 
import {VisualizationItemPresenterImpl} from './visualization-item.presenter'; 

@Component({
  selector: 'app-visualization-item',
  templateUrl: './visualization-item.component.html',
  styleUrls: ['./visualization-item.component.css']
})
export class VisualizationItemComponentImpl implements VisualizationItemComponent,OnInit {

	presenter:VisualizationItemPresenter;


	constructor( ){
		this.presenter = new VisualizationItemPresenterImpl();	
	}

	ngOnInit() {

	}

}
