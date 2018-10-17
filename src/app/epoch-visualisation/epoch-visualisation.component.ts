import { Component, OnInit } from '@angular/core';
import { ModelTrainerService } from '../model-trainer.service';

@Component({
  selector: 'app-epoch-visualisation',
  templateUrl: './epoch-visualisation.component.html',
  styleUrls: ['./epoch-visualisation.component.css']
})

export class EpochVisualisationComponent implements OnInit {

  modelTrainer: ModelTrainerService;
  epoch: number;

  constructor( modelTrainer: ModelTrainerService ) {
    this.modelTrainer = modelTrainer;
    this.modelTrainer.trainer$.subscribe(
      data => this.epoch = data.epoch
      /*next(data) { console.log(this); console.log(data.epoch);   = data.epoch },
     error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }*/
    );
  }

  ngOnInit() {
    this.epoch = 1;
    this.modelTrainer.trainer$.subscribe(
      data => this.epoch = data.epoch
      /*next(data) { console.log(this); console.log(data.epoch);   = data.epoch },
     error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }*/
    );
  }

}
