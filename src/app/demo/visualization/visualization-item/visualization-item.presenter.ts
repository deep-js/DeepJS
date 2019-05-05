import {VisualizationItemPresenter, VisualizationContainerPresenter, VisualizationComponent} from '@api/core';


/**
 * Implementation for VisualizationItemPresenter
 *
 */
export class VisualizationItemPresenterImpl implements VisualizationItemPresenter {

  private container:VisualizationContainerPresenter;
  private component:VisualizationComponent;

  constructor(container:VisualizationContainerPresenter, component:VisualizationComponent) {
    this.container = container;
    this.component = component;
  }

  ngOnInit() {
  }

  public remove(){
    this.container.removeVisualization(this.component);
  }

  public moveUp(){
    this.container.moveVisualization(this.component, -1);
  }

  public moveDown(){
    this.container.moveVisualization(this.component, 1);
  }

}
