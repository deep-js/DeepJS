import { ModelPresenter } from './model.presenter'

/**
 * Component allowing the user to import a model by different means
 * The implementation is chosen by the user dynamically with ModelContainerComponent
 */
export interface ModelComponent {

  /**
   * Get ModelComponent's presenter
   * @return {ModelPresenter} this component's presenter
   */
  getPresenter():ModelPresenter;
}

