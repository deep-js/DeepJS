import { Component, OnInit } from '@angular/core';
import { VisualizationContainerComponent, VisualizationContainerPresenter, VisualizationComponent } from '@api/core';
import { VisualizationContainerPresenterImpl } from './visualization-container.presenter';


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

  private presenter:VisualizationContainerPresenter;
  private selection:VisualizationComponent[];
  private modules:String[];
  private selected:String;

  constructor() { 
    this.presenter = new VisualizationContainerPresenterImpl();
  }

  ngOnInit() {
    this.modules = Array.from(this.presenter.getVisualizationModules());
    this.selected = this.modules[0];
    this.presenter.getSelection$().subscribe( (s) => this.selection = s);
  }

}
