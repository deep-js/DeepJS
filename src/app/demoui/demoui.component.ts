import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as ts from "typescript";
import { fromEvent, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'
import { ModelTrainerService0, ModelTrainerService } from '../model-trainer.service';
import { Training, TrainingFactory} from '../training';


export interface DemoUI {
  getTraining():Training;
  getTrainings$():Observable<Training>;
  getVisualisations():VisualisationUI[];
}

@Component({
  selector: 'app-demoui',
  templateUrl: './demoui.component.html',
  styleUrls: ['./demoui.component.css']
})

export class DemoUIImpl implements OnInit, DemoUI {

  private training: Training;
  private modelUI: ModelUI;
  private inputUI: ModelUI;
  private visualisations:VisualisationUI[];
  private trainings$: Observable<Training>;
  @ViewChild('button') run: ElementRef;

  constructor( model_trainer: ModelTrainerService ) {
    this.model_trainer = model_trainer;
  }
  
  getTraining():Training{ return this.training; }
  getModelUI():ModelUI { return this.modelUI; }
  getInputUI():InputUI { return this.inputUI; }
  getVisualisations():VisualisationUI[] { return this.visualisations; }

  ngOnInit() {
    this.modelUI = new ModelUI();

    /*this.trainings$ = fromEvent(this.button.nativeElement, 'click')
    .pipe(map((event) => this.modelUI(import)));*/

    this.training_def = "const training = { batchSize: 250, epochs: 4000, validationSplit: 0, shuffle: true }"
  }


}


