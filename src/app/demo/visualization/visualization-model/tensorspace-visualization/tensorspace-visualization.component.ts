import { ElementRef, ViewChild, Component, AfterViewInit} from '@angular/core';
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
  @ViewChild('tensorspace') tensorspaceContainer:ElementRef; 
  modelTrainer: TrainerServiceImpl;
  private tspModel:TSP.Model;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.presenter = new TensorspaceVisualizationPresenter(modelTrainer);
    this.modelTrainer = modelTrainer;


  }

  data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.019607843831181526,0.027450980618596077,0.027450980618596077,0.027450980618596077,0.40784314274787903,0.5098039507865906,0.5098039507865906,0.6901960968971252,1,0.7960784435272217,0.5098039507865906,0.0470588244497776,0.003921568859368563,0,0,0,0,0,0,0,0,0,0,0.003921568859368563,0.09803921729326248,0.5333333611488342,0.5333333611488342,0.5333333611488342,0.8509804010391235,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9764705896377563,0.9450980424880981,0.9450980424880981,0.4941176474094391,0.4588235318660736,0.0117647061124444,0,0,0,0,0,0,0,0,0,0,0.07058823853731155,0.9647058844566345,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9411764740943909,0.9215686321258545,0.9215686321258545,0.5490196347236633,0.8156862854957581,0.9215686321258545,0.5137255191802979,0.27843138575553894,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.007843137718737125,0.38823530077934265,0.9921568632125854,0.6196078658103943,0.4117647111415863,0.12941177189350128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.13333334028720856,0.9921568632125854,0.9921568632125854,0.364705890417099,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.10588235408067703,0.8352941274642944,0.9921568632125854,0.6039215922355652,0.13333334028720856,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5333333611488342,0.9921568632125854,0.9921568632125854,0.4901960790157318,0.1725490242242813,0.1725490242242813,0.13725490868091583,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.4431372582912445,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9333333373069763,0.572549045085907,0.14901961386203766,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01568627543747425,0.5607843399047852,0.9019607901573181,0.9647058844566345,0.8078431487083435,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9215686321258545,0.33725491166114807,0.05098039284348488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1568627506494522,0.23137255012989044,0.03921568766236305,0.2666666805744171,0.2666666805744171,0.6627451181411743,0.9921568632125854,0.9921568632125854,0.6431372761726379,0.0470588244497776,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.054901961237192154,0.3607843220233917,0.929411768913269,0.9921568632125854,0.6431372761726379,0.0470588244497776,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5333333611488342,0.929411768913269,0.9921568632125854,0.30980393290519714,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.38823530077934265,0.9921568632125854,0.929411768913269,0.2705882489681244,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.19607843458652496,0.929411768913269,0.9921568632125854,0.6274510025978088,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.38823530077934265,0.9921568632125854,0.9411764740943909,0.10196078568696976,0,0,0,0,0,0,0,0,0,0,0,0,0.0117647061124444,0.6509804129600525,0.8117647171020508,0,0,0,0,0,0,0,0,0,0.3176470696926117,0.9921568632125854,0.9921568632125854,0.11764705926179886,0,0,0,0,0,0,0,0,0,0,0,0,0.027450980618596077,0.9921568632125854,0.9490196108818054,0.4156862795352936,0.4156862795352936,0.35686275362968445,0,0,0,0,0,0,0.3176470696926117,0.9921568632125854,0.9921568632125854,0.11764705926179886,0,0,0,0,0,0,0,0,0,0,0,0,0.01568627543747425,0.7921568751335144,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9843137264251709,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9254902005195618,0.9450980424880981,0.9921568632125854,0.6509804129600525,0.0117647061124444,0,0,0,0,0,0,0,0,0,0,0,0,0,0.05098039284348488,0.5647059082984924,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.40392157435417175,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.003921568859368563,0.019607843831181526,0.019607843831181526,0.3333333432674408,0.5058823823928833,0.6000000238418579,0.9921568632125854,0.9921568632125854,0.9921568632125854,0.8509804010391235,0.5058823823928833,0.34117648005485535,0.003921568859368563,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


  render(m:tf.LayersModel){
    var init = this.tspModel === undefined;

    this.tspModel = this.convert(m);

    const prepocessedModel:tf.LayersModel = this.preprocess(m);


    this.tspModel.load({
      type: 'live',
      modelHandler: prepocessedModel,
      outputsName: m.layers.map((l) => l.name),
      onComplete: function(){
        console.log("loaded model into tensorspace");
      }
    });


    if(init){
      // Load data
      this.tspModel.init(() => this.tspModel.predict(this.data));
    }

  } 

  convertLayer(l:tf.layers.Layer): TSP.Layer {
    const layerType:string = l.name.split("_")[0];
    var tspLayer:TSP.Layer;
    switch(layerType){
      case 'conv2d':
        tspLayer = new TSP.layers.Conv2d();
        break;
      case 'max':
        tspLayer = new TSP.layers.Pooling2d();
        break;
      case 'flatten':
        tspLayer = new TSP.layers.Flatten();
        break;
      case 'dense':
        tspLayer = new TSP.layers.Dense();
        break;
      case 'conv2d':
        tspLayer = new TSP.layers.Conv2d();
        break;
      case 'conv2d':
        tspLayer = new TSP.layers.Conv2d();
        break;
      case 'conv2d':
        tspLayer = new TSP.layers.Conv2d();
        break;

    }
    return tspLayer;

  }

  convert(m:tf.LayersModel):TSP.Model {

    const tspModel = new TSP.models.Sequential(this.tensorspaceContainer.nativeElement);

    var inputShape = m.layers[0].batchInputShape.slice(1);
    tspModel.add(new TSP.layers.GreyscaleInput({ shape: inputShape }));
    for(var i = 0; i<m.layers.length; i++){
      tspModel.add(this.convertLayer(m.layers[i]));
    }
    return tspModel
  }

  preprocess(model:tf.LayersModel):tf.LayersModel{
    /*var inputShape = model.inputs[0].sourceLayer.batchInputShape.slice(1);
    const a = tf.layers.inputLayer({inputShape: inputShape});
    const b = tf.sequential();
    b.add(a);
    for ( const c of model.layers){
      b.add(c);
    }
    var outputList = [];
    for ( let i = 0; i < b.layers.length; i ++ ) {
      outputList.push( b.layers[i].output );
    }
    console.log(b.inputs);
    return tf.model({inputs: b.inputs, outputs: outputList});*/
    var outputList = [];
    for ( let i = 0; i < model.layers.length; i ++ ) {
      outputList.push( model.layers[i].output );
    }
    console.log(model);
    return tf.model({inputs: model.inputs, outputs: outputList});

  }

  ngAfterViewInit() {

    this.modelTrainer.getCurrentTrainings$().subscribe( (t) => this.render(t.getModel()));

  }

}
