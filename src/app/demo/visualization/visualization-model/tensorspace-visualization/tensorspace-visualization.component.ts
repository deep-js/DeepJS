import { ViewChild, Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import {VisualizationModelPresenter, VisualizationModelComponent} from '@api/core';
import { TensorspaceVisualizationPresenter } from './tensorspace-visualization.presenter';
import * as TSP from 'tensorspace';
import * as tf from '@tensorflow/tfjs';


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
  modelTrainer: TrainerServiceImpl;

  @ViewChild('tensorspace') tensorspaceContainer; 

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

    /*
  convertLayer(l:tf.Layer): TSP.Layer {



  }


  convert(m:tf.LayersModel):TSP.Model {
    let modelContainer = document.getElementById("tensorspaceContainer");
    let model = new TSP.models.Sequential(modelContainer);
    for(var i = 0; i<m.layers.length; i++){
      model.add(convertLayer(m.layers[i]));
    }
  }
     */

  render(m:tf.Model){
    let modelContainer = document.getElementById("tensorspaceContainer");
    let model = new TSP.models.Sequential(modelContainer);
    model.add(new TSP.layers.Conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add( new TSP.layers.Dense({ units: 10 }) );

    const predictData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.019607843831181526,0.027450980618596077,0.027450980618596077,0.027450980618596077,0.40784314274787903,0.5098039507865906,0.5098039507865906,0.6901960968971252,1,0.7960784435272217,0.5098039507865906,0.0470588244497776,0.003921568859368563,0,0,0,0,0,0,0,0,0,0,0.003921568859368563,0.09803921729326248,0.5333333611488342,0.5333333611488342,0.5333333611488342,0.8509804010391235,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9764705896377563,0.9450980424880981,0.9450980424880981,0.4941176474094391,0.4588235318660736,0.0117647061124444,0,0,0,0,0,0,0,0,0,0,0.07058823853731155,0.9647058844566345,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9411764740943909,0.9215686321258545,0.9215686321258545,0.5490196347236633,0.8156862854957581,0.9215686321258545,0.5137255191802979,0.27843138575553894,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.007843137718737125,0.38823530077934265,0.9921568632125854,0.6196078658103943,0.4117647111415863,0.12941177189350128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.13333334028720856,0.9921568632125854,0.9921568632125854,0.364705890417099,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.10588235408067703,0.8352941274642944,0.9921568632125854,0.6039215922355652,0.13333334028720856,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5333333611488342,0.9921568632125854,0.9921568632125854,0.4901960790157318,0.1725490242242813,0.1725490242242813,0.13725490868091583,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.4431372582912445,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9333333373069763,0.572549045085907,0.14901961386203766,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01568627543747425,0.5607843399047852,0.9019607901573181,0.9647058844566345,0.8078431487083435,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9215686321258545,0.33725491166114807,0.05098039284348488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1568627506494522,0.23137255012989044,0.03921568766236305,0.2666666805744171,0.2666666805744171,0.6627451181411743,0.9921568632125854,0.9921568632125854,0.6431372761726379,0.0470588244497776,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.054901961237192154,0.3607843220233917,0.929411768913269,0.9921568632125854,0.6431372761726379,0.0470588244497776,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5333333611488342,0.929411768913269,0.9921568632125854,0.30980393290519714,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.38823530077934265,0.9921568632125854,0.929411768913269,0.2705882489681244,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.19607843458652496,0.929411768913269,0.9921568632125854,0.6274510025978088,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.38823530077934265,0.9921568632125854,0.9411764740943909,0.10196078568696976,0,0,0,0,0,0,0,0,0,0,0,0,0.0117647061124444,0.6509804129600525,0.8117647171020508,0,0,0,0,0,0,0,0,0,0.3176470696926117,0.9921568632125854,0.9921568632125854,0.11764705926179886,0,0,0,0,0,0,0,0,0,0,0,0,0.027450980618596077,0.9921568632125854,0.9490196108818054,0.4156862795352936,0.4156862795352936,0.35686275362968445,0,0,0,0,0,0,0.3176470696926117,0.9921568632125854,0.9921568632125854,0.11764705926179886,0,0,0,0,0,0,0,0,0,0,0,0,0.01568627543747425,0.7921568751335144,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9843137264251709,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9450980424880981,0.9921568632125854,0.6509804129600525,0.0117647061124444,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05098039284348488,0.5647059082984924,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.40392157435417175,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.003921568859368563,0.019607843831181526,0.019607843831181526,0.3333333432674408,0.5058823823928833,0.6000000238418579,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.8509804010391235,0.5058823823928833,0.34117648005485535,0.003921568859368563,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    console.log(m);
    const a = [];
    for(var i = 0; i<m.layers.length; i++){
      a.push(m.layers[i].output)
    }
    const mm = tf.model({ inputs: m.inputs, outputs: a});
    model.load({
      type: "live",
      modelHandler: mm
    });

    model.init(() => model.predict(predictData));
  }
  ngAfterViewInit() {

    this.modelTrainer.getCurrentTrainings$().subscribe( (t) => this.render(t.getModel()));
    
  }

}
