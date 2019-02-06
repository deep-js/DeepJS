import { Component, AfterViewInit} from '@angular/core';
import { map } from 'rxjs/operators'
import { TrainerServiceImpl, TrainerService } from '../../../../shared/services/trainer/trainer.service';
import { VisualizationModelPresenter } from '@api/core';
import { Observable } from 'rxjs'


export class TestModelVisualizationPresenter implements VisualizationModelPresenter {

  modelTrainer: TrainerService;
  out: string;  // textual summary of the model
  data$:Observable<string>;

  constructor(modelTrainer: TrainerServiceImpl) {
    this.modelTrainer = modelTrainer;
    this.out = "";
    this.data$ = this.modelTrainer.getCurrentTrainings$().pipe( map((training) => {
      // do whatever with model
      this.out = "";  // reset model summary
      training.getModel().summary(80,[30,60,90], x => this.out+=x+"\n");  // 2nd argument : for each line of the generated summary, add it to the string being displayed
      return this.out;
    })
    )
  }

  public getData$(){
    return this.data$;
  }

}
