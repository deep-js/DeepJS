import { Component, OnInit } from '@angular/core';
import { VisualizationContainerComponent } from '@api/core';

@Component({
  selector: 'app-visualization-container',
  templateUrl: './visualization-container.component.html',
  styleUrls: ['./visualization-container.component.css']
})
export class VisualizationContainerComponentImpl implements VisualizationContainerComponent, OnInit {

  constructor() { }

  ngOnInit() {
  }

}
