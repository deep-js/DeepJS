import { ModelPresenter } from './model.presenter'

export interface ModelComponent {
  getPresenter():ModelPresenter;
}

