import { ModelContainerPresenter } from './model-container.presenter'

/**
 * Component that contains the model importation component
 * The model importation component is choosen dynamically by th UI inside this component
 * also contains UI for exporting a LayersModel 
 */
export interface ModelContainerComponent {
  /**
   * Get the modelcontainer component's presenter
   * @return {ModelContainerPresenter} this component presenter
   */
  getPresenter():ModelContainerPresenter;
}

