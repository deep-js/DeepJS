import { ModelContainerPresenter } from './model-container.presenter'

/**
 * Component that contains the model importation component
 * The model importation component is choosen dynamically by th UI inside this component
 * also contains UI for exporting a Model 
 */
export interface ModelContainerComponent {
  getPresenter():ModelContainerPresenter;
}

