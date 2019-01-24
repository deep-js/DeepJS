import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../shared/services/trainer/trainer.service';


/* Quick implementation of a textual model visualisation
 * using tf.Model.summarize
 */
@Component({
  selector: 'app-test-model-visualisation',
  templateUrl: './test-model-visualisation.component.html',
  styleUrls: ['./test-model-visualisation.component.css']
  
})
export class TestModelVisualisationComponent implements OnInit {

  modelTrainer: TrainerService;
  out: string;  // textual summary of the model

  constructor(modelTrainer: TrainerServiceImpl) {
    this.modelTrainer = modelTrainer;
    this.out = "";
  }

  ngOnInit() {
    // for each model trained by TrainerService, display its summary
    this.modelTrainer.getCurrentTrainings$().subscribe( (training) => {
      // do whatever with model
      this.out = "";  // reset model summary
      training.getModel().summary(80,[30,60,90], x => this.out+=x+"\n");  // 2nd argument : for each line of the generated summary, add it to the string being displayed
    }
    )

  }

}
