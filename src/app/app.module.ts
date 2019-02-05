import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TSModelPresenter} from '@api/core';


import { AppComponent } from './app.component';

// TODO : can't we link the interfaces there ? by putting the @Component in them ?
import { ModelContainerComponentImpl } from './demo/model/model-container.component';
import { TSModelComponentImpl } from './demo/model/ts-model/ts-model.component';
import { JSONModelComponentImpl } from './demo/model/json-model/json-model.component';
import { DemoComponentImpl } from './demo/demo.component';
import { TrainerService, TrainerServiceImpl } from './shared/services/trainer/trainer.service';
import {TestModelVisualisationComponent } from './demo/test-model-visualisation/test-model-visualisation.component'
import {EpochVisualisationComponent } from './demo/epoch-visualisation/epoch-visualisation.component';
import { InputComponentImpl } from './demo/input/input.component';
import { ImageInputComponentImpl } from './demo/input/image-input/image-input.component';
import { JsonInputComponentImpl } from './demo/input/json-input/json-input.component'
import { ModifParamModelComponentImpl } from './demo/model/modif-param-model/modif-param-model.component';

declare global {
  interface Window {
      fs: any;
      os: any;
    }
}

@NgModule({
  declarations: [
    ModelContainerComponentImpl,
    AppComponent,
    TSModelComponentImpl,
    JSONModelComponentImpl,
    DemoComponentImpl,
    TestModelVisualisationComponent,
    EpochVisualisationComponent,
    InputComponentImpl,
    ImageInputComponentImpl,
    JsonInputComponentImpl,
    ModifParamModelComponentImpl 
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TrainerServiceImpl],
  //  providers: [ {provide:[ModelTrainer], useClass:[ModelTrainerImpl]} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
