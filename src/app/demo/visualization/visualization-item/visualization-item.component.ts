import { Component, OnInit } from '@angular/core';
import {VisualizationItemPresenter, VisualizationItemComponent} from '@api/core'; 

@Component({
  selector: 'app-visualization-item',
  templateUrl: './visualization-item.component.html',
  styleUrls: ['./visualization-item.component.css']
})
export class VisualizationItemComponentImpl implements VisualizationItemComponent,OnInit {



  constructor() { }

  ngOnInit() {
  }

}
