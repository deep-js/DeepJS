import { ViewChild, Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import {VisualizationModelPresenter, VisualizationModelComponent} from '@api/core';
import { TensorspaceVisualizationPresenter } from './tensorspace-visualization.presenter';
import * as TSP from 'tensorspace';


/**
 * Quick implementation of a textual model visualization
 * using tf.Model.summarize
 */
@Component({
  selector: 'app-tensorspace-visualization',
  templateUrl: './tensorspace-visualization.component.html',
  styleUrls: ['./tensorspace-visualization.component.css']

})
export class TensorspaceVisualizationComponent implements AfterViewInit, VisualizationModelComponent {

  presenter: VisualizationModelPresenter;
  @ViewChild('tensorspace') tensorspaceContainer; 

  constructor(modelTrainer: TrainerServiceImpl) {
    this.presenter = new TensorspaceVisualizationPresenter(modelTrainer);


    /*
    const model = tf.sequential();
    model.add(tf.layers.conv2d({ inputShape: [28, 28, 1],kernelSize: 3, filters: 16,activation: 'relu'}));
    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(tf.layers.flatten({}));
    model.add(tf.layers.dense({units: 64, activation: 'relu'}));
    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    const optimizer = 'rmsprop';
    model.compile({ optimizer,loss: 'categoricalCrossentropy', metrics: ['accuracy'],});
     */
    /*
    let container = document.getElementById( "tensorspaceContainer" );
    let model = new tsp.models.Sequential( container );
    model.add( new tsp.layers.GreyscaleInput({ shape: [28, 28, 1] }) );
    model.add( new tsp.layers.Padding2d({ padding: [2, 2] }) );
    model.add( new tsp.layers.Conv2d({ kernelSize: 5, filters: 6, strides: 1 }) );
    model.add( new tsp.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
    model.add( new tsp.layers.Conv2d({ kernelSize: 5, filters: 16, strides: 1 }) );
    model.add( new tsp.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
    model.add( new tsp.layers.Dense({ units: 120 }) );
    model.add( new tsp.layers.Dense({ units: 84 }) );
    model.add( new tsp.layers.Output1d({
      units: 10,
      outputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }) );

    model.init();
     */
  }

  ngAfterViewInit() {
    let modelContainer = document.getElementById("tensorspaceContainer");
    let model = new TSP.models.Sequential(modelContainer);
    model.add( new TSP.layers.GreyscaleInput({ shape: [28, 28, 1] }) );
    model.add( new TSP.layers.Padding2d({ padding: [2, 2] }) );
    model.add( new TSP.layers.Conv2d({ kernelSize: 5, filters: 6, strides: 1 }) );
    model.add( new TSP.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
    model.add( new TSP.layers.Conv2d({ kernelSize: 5, filters: 16, strides: 1 }) );
    model.add( new TSP.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }) );
    model.add( new TSP.layers.Dense({ units: 120 }) );
    model.add( new TSP.layers.Dense({ units: 84 }) );
    model.add( new TSP.layers.Output1d({
      units: 10,
      outputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }) );

    model.init();
  }

}
