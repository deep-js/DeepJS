import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-neuron-visualisation',
  templateUrl: './neuron-visualisation.component.html',
  styleUrls: ['./neuron-visualisation.component.css']
})
export class NeuronVisualisationComponent implements OnInit {

	model : tf.Sequential;
	modelJSON : JSON;



  constructor() { 

  }

  ngOnInit() {
  	const KERNEL_INIT = 'varianceScaling';
  	this.model = tf.sequential();
  	this.model.add(tf.layers.dense({units: 20, inputShape: [2], activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 20, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  this.model.add(tf.layers.dense({units: 3, activation: 'relu', kernelInitializer: KERNEL_INIT}));
	  console.log(this.model.layers.length);
	  this.modelJSON = JSON.stringify(this.model);
  	console.log(JSON.stringify(this.object));
  }



}
