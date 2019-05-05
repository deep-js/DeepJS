import { VisualizationContainerPresenter } from '@api/core'; //import { VisualizationInferenceJSONComponent } from '@api/core';
import { VisualizationInferenceJSONComponentImpl } from './visualization-inference/visualization-inference-json/visualization-inference-json.component';
//import { VisualizationInferenceImageComponent } from '@api/core';
import { VisualizationInferenceImageComponentImpl } from './visualization-inference/visualization-inference-image/visualization-inference-image.component';
import { EpochVisualizationComponent } from './visualization-training/epoch-visualisation/epoch-visualisation.component';
import { TextVisualizationModelComponent } from './visualization-model/text-model-visualization/text-model-visualization.component';
import { TensorspaceVisualizationComponent } from './visualization-model/tensorspace-visualization/tensorspace-visualization.component';
import { VisualizationComponent } from '@api/core';
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
      .set('EpochVisualizationComponent', EpochVisualizationComponent)
      .set('TextVisualizationModelComponent', TextVisualizationModelComponent)
      .set('VisualizationInferenceJSONComponentImpl', VisualizationInferenceJSONComponentImpl)
      .set('VisualizationInferenceImageComponentImpl', VisualizationInferenceImageComponentImpl)
      .set('TensorspaceVisualizationComponent', TensorspaceVisualizationComponent);
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

  }


}

