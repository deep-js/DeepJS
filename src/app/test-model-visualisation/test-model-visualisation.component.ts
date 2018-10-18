import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { ModelTrainerService } from '../model-trainer.service';

@Component({
  selector: 'app-test-model-visualisation',
  templateUrl: './test-model-visualisation.component.html',
  styleUrls: ['./test-model-visualisation.component.css']
})
export class TestModelVisualisationComponent implements OnInit {

  modelTrainer: ModelTrainerService;
  out: string;

  constructor(modelTrainer: ModelTrainerService) {
    this.modelTrainer = modelTrainer;
    this.out = "";
  }

  ngOnInit() {
    this.modelTrainer.currentTrainings$.subscribe( (training) => {
      // do whatever with model
      this.out = "";
      training.model.summary(80,[30,60,90], x => this.out+=x+"\n");
      console.log(this.out);
    }
    )

  }

}
