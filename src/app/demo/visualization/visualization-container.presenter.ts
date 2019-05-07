import { VisualizationContainerPresenter } from '@api/core'; //import { VisualizationInferenceJSONComponent } from '@api/core';
import { VisualizationInferenceJSONComponentImpl } from './visualization-inference/visualization-inference-json/visualization-inference-json.component';
//import { VisualizationInferenceImageComponent } from '@api/core';
import { VisualizationInferenceImageComponentImpl } from './visualization-inference/visualization-inference-image/visualization-inference-image.component';
import { EpochVisualizationComponent } from './visualization-training/epoch-visualisation/epoch-visualisation.component';
import { TextVisualizationModelComponent } from './visualization-model/text-model-visualization/text-model-visualization.component';
import { TensorspaceVisualizationComponent } from './visualization-model/tensorspace-visualization/tensorspace-visualization.component';
import { VisualizationComponent } from '@api/core';
import { LossVisualizationComponent } from './visualization-training/loss-visualization/loss-visualisation.component'
import { LossChartVisualizationComponent } from './visualization-training/loss-chart-visualization/loss-chart-visualisation.component'
import { Subject } from 'rxjs';

/**
 * Implementation for VisualizationContainerPresenter
 *
 */
export class VisualizationContainerPresenterImpl implements VisualizationContainerPresenter{


  private visualizationModules: Map<String, VisualizationComponent>
    private selection: VisualizationComponent[];
  private selection$:Subject<VisualizationComponent[]>;

  constructor() {
    this.selection$ = new Subject();
    this.visualizationModules = new Map()
      .set('Epoch', EpochVisualizationComponent)
      .set('Loss', LossVisualizationComponent)
      .set('Loss Chart', LossChartVisualizationComponent)
      .set('Textual Model Summary', TextVisualizationModelComponent)
      .set('Inference JSON', VisualizationInferenceJSONComponentImpl)
      .set('Inference Image', VisualizationInferenceImageComponentImpl)
      .set('Tensorspace', TensorspaceVisualizationComponent);
    this.selection = [];
    this.update();
  }

  private update() {
    this.selection$.next(this.selection);
  }

  public getSelection$():Subject<VisualizationComponent[]> {
    return this.selection$;
  }

  public getVisualizationModules(){
    return this.visualizationModules.keys();
  }

  public addVisualization(name:String){
    if(this.visualizationModules.has(name) ){ 
      this.selection.push(this.visualizationModules.get(name));
      this.update();
    }
    else {
      throw new Error("visualization "+name+" is unknown");
    }
  }

  public removeVisualization(v:VisualizationComponent){

    this.selection = this.selection.filter( (a) => a != v);
    this.update();
  }

  public moveVisualization(v:VisualizationComponent, i:number){
    const o = this.selection.indexOf(v);
    const n = o+i;
    if (n >= this.selection.length) {
      var k = n - this.selection.length + 1;
      while (k--) {
        this.selection.push(undefined);
      }
    }
    this.selection.splice(n, 0, this.selection.splice(o, 1)[0]);
  }

  public getComponentName(c:VisualizationComponent):String {
    const b = Array.from(this.visualizationModules.values()).indexOf(c);
    const a=Array.from(this.visualizationModules.keys())[b]
    return a;
  }
}

