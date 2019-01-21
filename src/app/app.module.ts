import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { DrawableDirective } from './drawable.directive';
import { ModelUI } from './modelui/modelui.component';
import { NeuronVisualisationComponent } from './neuron-visualisation/neuron-visualisation.component';
import { EpochVisualisationComponent } from './epoch-visualisation/epoch-visualisation.component';
import { ModelTrainerService0, ModelTrainerService } from './model-trainer.service';
import { TestModelVisualisationComponent } from './test-model-visualisation/test-model-visualisation.component';


declare global {
  interface Window {
      fs: any;
      os: any;
    }
}

@NgModule({
  declarations: [
    AppComponent,
    DrawableDirective,
    ModelUI,
    NeuronVisualisationComponent,
    EpochVisualisationComponent,
    TestModelVisualisationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ {provide: ModelTrainerService, useClass: ModelTrainerService0} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
