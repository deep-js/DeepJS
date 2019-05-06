import { ViewChild, Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import {VisualizationModelPresenter, VisualizationModelComponent} from '@api/core';
import { TensorspaceVisualizationPresenter } from './tensorspace-visualization.presenter';
import * as TSP from 'tensorspace';
import * as tf from '@tensorflow/tfjs';


/**
 * Quick implementation of a textual model visualization
 * using tf.LayersModel.summarize
 */
@Component({
  selector: 'app-tensorspace-visualization',
  templateUrl: './tensorspace-visualization.component.html',
  styleUrls: ['./tensorspace-visualization.component.css']

})
export class TensorspaceVisualizationComponent implements AfterViewInit, VisualizationModelComponent {

  presenter: VisualizationModelPresenter;
  @ViewChild('tensorspace') tensorspaceContainer; 
  modelTrainer: TrainerServiceImpl;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.presenter = new TensorspaceVisualizationPresenter(modelTrainer);
    this.modelTrainer = modelTrainer;


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
    model.add( new tsp.layers.Conv2d() );
    model.add( new tsp.layers.Pooling2d() );
    model.add( new tsp.layers.Conv2d() );
    model.add( new tsp.layers.Pooling2d() );
    model.add( new tsp.layers.Conv2d() );
    model.add( new tsp.layers.Flatten() );
    model.add( new tsp.layers.Dense() );
    model.add( new tsp.layers.Dense() );

    model.init();
     */
  }


  convert(model:tf.LayersModel):tf.LayersModel{
    var outputList = [];
    for ( let i = 0; i < model.layers.length; i ++ ) {
          outputList.push( model.layers[i].output );
    }
    const inputs = tf.input({shape: [28,28,1]}) ;
    console.log(inputs);
    return tf.model({inputs: model.inputs, outputs: outputList});
  
  }

  render(omodel:tf.LayersModel){
    /*var mm = tf.sequential();
    mm.add(tf.layers.conv2d({ inputShape: [28, 28, 1],kernelSize: 3, filters: 16,activation: 'relu'}));
    mm.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    mm.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    mm.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    mm.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    mm.add(tf.layers.flatten({}));
    mm.add(tf.layers.dense({units: 64, activation: 'relu'}));
    mm.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    const optimizer = 'rmsprop';
    mm.compile({ optimizer,loss: 'categoricalCrossentropy', metrics: ['accuracy'],});*/
    let modelContainer = document.getElementById("tensorspaceContainer");
    let model = new TSP.models.Sequential(modelContainer);
    model.add( new TSP.layers.Conv2d({ inputShape: [28, 28, 1],kernelSize: 3, filters: 16,activation: 'relu'}) );
    model.add( new TSP.layers.Pooling2d({poolSize: 2, strides: 2}) );
    model.add( new TSP.layers.Conv2d({kernelSize: 3, filters: 32, activation: 'relu'}) );
    model.add( new TSP.layers.Pooling2d({poolSize: 2, strides: 2}) );
    model.add( new TSP.layers.Conv2d({kernelSize: 3, filters: 32, activation: 'relu'}) );
    model.add( new TSP.layers.Flatten() );
    /*var mm = tf.sequential();
    mm.add(tf.layers.dense({inputShape: [64], units: 64, activation: 'relu'}));
    mm.add(tf.layers.dense({units: 10, activation: 'softmax'}));*/
    model.add( new TSP.layers.Dense({units: 64, activation: 'relu'}) );
    model.add( new TSP.layers.Dense({units: 10, activation: 'softmax'}) );
    //let outmodel = this.convert(mm);//new TSP.models.Sequential(modelContainer);
    model.load({
      type: 'live',
      modelHandler: omodel
    })

    model.init();
  } 

  ngAfterViewInit() {


    /*
    let modelContainer = document.getElementById("tensorspaceContainer");
    let tmodel = TSP.models.Sequential( modelContainer );
    tmodel.add(new TSP.layers.GreyscaleInput({ shape: [28, 28, 1] }));
    tmodel.add(new TSP.layers.Padding2d({ padding: [2, 2] }));
    tmodel.add(new TSP.layers.Conv2d({ kernelSize: 5, filters: 6, strides: 1 }));
    tmodel.add(new TSP.layers.Pooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    //tspModelSeq.layers = model.layers;
    tmodel.init();*/

    
    this.modelTrainer.getCurrentTrainings$().subscribe( (training) => this.render(training.getModel()) )





  }

}
