import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../shared/services/trainer/trainer.service';

@Component({
  selector: 'app-test-model-visualisation',
  templateUrl: './test-model-visualisation.component.html',
  styleUrls: ['./test-model-visualisation.component.css']
  
})
export class TestModelVisualisationComponent implements OnInit {

  modelTrainer: TrainerService;
  out: string;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.modelTrainer = modelTrainer;
    this.out = "";
  }

  ngOnInit() {
    this.modelTrainer.getCurrentTrainings$().subscribe( (training) => {
      // do whatever with model
      console.log(training);
      this.out = "";
      training.getModel().summary(80,[30,60,90], x => this.out+=x+"\n");
      console.log(training.getModel());
      console.log(this.out);
    }
    )

  }

}
