import { Subject } from 'rxjs';
import { VisualizationComponent } from '@api/core';
/**
 * Presenter for VisualizationContainerComponent
 * dynamically makes new visualizations for its component
 */
export interface VisualizationContainerPresenter{
  getSelection$():Subject<VisualizationComponent[]>;
  getVisualizationModules();
  addVisualization(name:String);
  removeVisualization(v:VisualizationComponent);
  moveVisualization(v:VisualizationComponent, i:number);
  getComponentName(c:VisualizationComponent):String;

}
