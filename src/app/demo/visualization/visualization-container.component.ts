import { Component, OnInit } from '@angular/core';
import { VisualizationContainerComponent } from '@api/core';

@Component({
  selector: 'app-visualization-container',
  templateUrl: './visualization-container.component.html',
  styleUrls: ['./visualization-container.component.css']
})

/**
 * Implementation for VisualizationContainerComponent
 *
 */
export class VisualizationContainerComponentImpl implements VisualizationContainerComponent, OnInit {

  constructor() { }

  ngOnInit() {
  }

}
