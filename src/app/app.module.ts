import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { DrawableDirective } from './drawable.directive';
import { ModelDefComponent } from './model-def/model-def.component';
import { NeuronVisualisationComponent } from './neuron-visualisation/neuron-visualisation.component';
import { EpochVisualisationComponent } from './epoch-visualisation/epoch-visualisation.component';
import { ModelTrainerService } from './model-trainer.service';


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
    EpochVisualisationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ModelTrainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
