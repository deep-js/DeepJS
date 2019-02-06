import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TSModelPresenter} from '@api/core';


import { AppComponent } from './app.component';

import { TSModelComponentImpl } from './demo/model/ts-model/ts-model.component';
import { JSONModelComponentImpl } from './demo/model/json-model/json-model.component';
import { DemoComponentImpl } from './demo/demo.component';
import { TrainerService, TrainerServiceImpl } from './shared/services/trainer/trainer.service';
import {TestModelVisualisationComponent } from './demo/test-model-visualisation/test-model-visualisation.component'
import {EpochVisualisationComponent } from './demo/epoch-visualisation/epoch-visualisation.component';
import { InputComponentImpl } from './demo/input/input.component';
import { ImageInputComponentImpl } from './demo/input/image-input/image-input.component';
import { JsonInputComponentImpl } from './demo/input/json-input/json-input.component';
import { InjectComponentDirective } from './shared/directives/inject-component.directive'

declare global {
  interface Window {
      fs: any;
      os: any;
    }
}

@NgModule({
  declarations: [
    AppComponent,
    TSModelComponentImpl,
    JSONModelComponentImpl,
    DemoComponentImpl,
    TestModelVisualisationComponent,
    EpochVisualisationComponent,
    InputComponentImpl,
    ImageInputComponentImpl,
    JsonInputComponentImpl,
    InjectComponentDirective 
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TrainerServiceImpl],
  entryComponents : [ImageInputComponentImpl, JsonInputComponentImpl],
  bootstrap: [AppComponent]
})
export class AppModule { }
