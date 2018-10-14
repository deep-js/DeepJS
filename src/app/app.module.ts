import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { DrawableDirective } from './drawable.directive';
import { ModelDefComponent } from './model-def/model-def.component';
import { NeuronVisualisationComponent } from './neuron-visualisation/neuron-visualisation.component';


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
    NeuronVisualisationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
