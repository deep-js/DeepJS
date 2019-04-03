import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import {TextVisualizationModelComponent } from './demo/visualization/visualization-model/text-model-visualization/text-model-visualization.component'
import {EpochVisualizationComponent } from './demo/visualization/visualization-training/epoch-visualisation/epoch-visualisation.component';
import { InputContainerComponentImpl } from './demo/input/input-container.component';
import { ImageInputComponentImpl } from './demo/input/image-input/image-input.component';
import { JsonInputComponentImpl } from './demo/input/json-input/json-input.component';
import { VisualizationContainerComponentImpl } from './demo/visualization/visualization-container.component';
import { VisualizationItemComponentImpl } from './demo/visualization/visualization-item/visualization-item.component';
import { InjectComponentDirective } from './shared/directives/inject-component.directive'
import { ImageDrawableDirective } from './shared/directives/image-drawable.directive'
import { ModifParamModelComponentImpl } from './demo/model/modif-param-model/modif-param-model.component';
import { VisualizationInferenceJSONComponentImpl } from './demo/visualization/visualization-inference/visualization-inference-json/visualization-inference-json.component';
import { VisualizationInferenceImageComponentImpl } from './demo/visualization/visualization-inference/visualization-inference-image/visualization-inference-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

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
    TextVisualizationModelComponent, 
    EpochVisualizationComponent,
    InputContainerComponentImpl,
    ImageInputComponentImpl,
    JsonInputComponentImpl,
    VisualizationInferenceImageComponentImpl, 
    VisualizationInferenceJSONComponentImpl, 
    VisualizationContainerComponentImpl,
    VisualizationItemComponentImpl,
    InjectComponentDirective,
    ImageDrawableDirective,
    ModifParamModelComponentImpl 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [TrainerServiceImpl],
  entryComponents: [JsonInputComponentImpl, ImageInputComponentImpl, JSONModelComponentImpl, TSModelComponentImpl],
  //  providers: [ {provide:[ModelTrainer], useClass:[ModelTrainerImpl]} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
