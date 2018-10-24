import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { DrawableDirective } from './drawable.directive';
import { ModelDefComponent } from './model-def/model-def.component';
import { NeuronVisualisationComponent } from './neuron-visualisation/neuron-visualisation.component';
import { EpochVisualisationComponent } from './epoch-visualisation/epoch-visualisation.component';
import { ModelTrainerService0, ModelTrainerService } from './model-trainer.service';
import { TestModelVisualisationComponent } from './test-model-visualisation/test-model-visualisation.component';
import { VisualisationsComponent } from './visualisations/visualisations.component';
import { VisualisationContainerDirective } from './visualisation-container.directive';


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
    ModelDefComponent,
    NeuronVisualisationComponent,
    EpochVisualisationComponent,
    TestModelVisualisationComponent,
    VisualisationsComponent,
    VisualisationContainerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ {provide: ModelTrainerService, useClass: ModelTrainerService0} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
