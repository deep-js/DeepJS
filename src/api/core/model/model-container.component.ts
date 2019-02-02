import { ModelContainerPresenter } from './model-container.presenter'

export interface ModelContainerComponent {
  getPresenter():ModelContainerPresenter;
}

