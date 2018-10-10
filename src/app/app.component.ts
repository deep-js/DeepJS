import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import * as tf from '@tensorflow/tfjs';
import * as data from './data';
import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  model: tf.Sequential;
  prediction: any;

  resultSize: number;
  allInputs: tf.Tensor2D
  @ViewChild(DrawableDirective) canvas;
  //@ViewChild('container') container;
  @ViewChild('points') svg;

  ngOnInit() {
    this.svg = d3.select(this.svg)
    this.resultSize = 200;
    // init all inputs
    var inputs: number[][] = [];
    for(var i=0;i<this.resultSize;i++){
      for(var j=0;j<this.resultSize;j++){
        inputs.push([i,j]);
      }
    }
    console.log(inputs);
    this.allInputs = tf.tensor2d(inputs).sub(tf.scalar(100)).cast('float32').div(tf.scalar(20));
    this.allInputs.print();
    this.displayInput(data.pointsCoords);
    this.train();
  }


  async train() {
      // Define a model for linear regression.
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 4, inputShape: [2], activation: 'tanh'}));
    this.model.add(tf.layers.dense({units: 1, activation: 'tanh'}));

    const LEARNING_RATE = 0.1;
    const optimizer = tf.train.sgd(LEARNING_RATE);
    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({loss: 'meanSquaredError', optimizer: optimizer});


    // Training data, completely random stuff
    const xs = tf.tensor(data.pointsCoords);
    const ys = tf.tensor(data.pointsLabels);


    // Train
    await this.model.fit(xs, ys, { batchSize: 10, epochs: 400, validationSplit: 0, callbacks: { 
      onTrainBegin: () => {
      },
      onTrainEnd: (epoch, logs) => {
      },
      onEpochBegin: async (epoch, logs) => {
      },
      onBatchBegin: async (epoch, logs) => {
      },
      onBatchEnd: async (epoch, logs) => {
      },
      onEpochEnd: (epoch,log) => { 
      this.printResult(epoch,log);
console.log(epoch);
      }
    } as tf.CustomCallbackConfig});
}
  printResult(epoch, log) {
    console.log("epoch "+epoch);

    if(epoch == 0)
      return;
    
    const out: any = this.predictAll();
    var imgdata = this.canvas.getImgData();
    const data = out.clipByValue(0,1).mul(tf.scalar(255)).cast('int32').dataSync(); 
    //console.log(data);
    //out.forEach(x => x.dispose());
    var k = 0;
    for(var i=0;i<data.length;i++){
      imgdata.data[k++] = 0;//255-data[i];
      imgdata.data[k++] = data[i];
      imgdata.data[k++] = 255-data[i];
      imgdata.data[k++] = 255; 
    }
    this.canvas.putImgData(imgdata);
  }

  predictAll(){
    return this.model.predict(this.allInputs);
  }

  predict(val) {
    const output = this.model.predict(tf.tensor2d([[val,-4]], [1, 2])) as any;
    this.prediction = Array.from(output.dataSync())
  }

  displayInput(inputs:number[][]){
    inputs.filter(x => x[0]>=-5 && x[0]<=5 && x[1]>=-5 && x[1]<=5);
    console.log(this.svg);
    let selection = d3.select("svg").selectAll("circle")
      .data(inputs)
      .enter().append("circle").attr("r", 3)
    
          .attr({
                  cx: (d: number[]) => d[0],
                  cy: (d: number[]) => d[1],
                })
    .style("fill", d => blue);
    console.log(inputs);
  }


}

