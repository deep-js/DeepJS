import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawableDirective } from './drawable.directive';

import * as tf from '@tensorflow/tfjs';
import * as data from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  model: tf.Sequential;
  prediction: any;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.train();
  }


  async train() {
      // Define a model for linear regression.
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 4, inputShape: [2]}));
    this.model.add(tf.layers.dense({units: 2}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


    // Training data, completely random stuff
    const xs = tf.tensor(data.pointsCoords);
    const ys = tf.tensor(data.pointsLabels);


    // Train
    await this.model.fit(xs, ys, { batchSize: 10, epochs: 400, validationSplit: 0.5});

    console.log('model trained!')
  }

  predict(val) {
    const output = this.model.predict(tf.tensor2d([[val,-4]], [1, 2])) as any;
    this.prediction = Array.from(output.dataSync())
  }

}

