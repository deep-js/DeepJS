import { VisualizationPresenter } from '../visualization.presenter';

/**
 * Parent type for all presenters of components inheriting VisualizationModelComponent
 * Gets the current model from the trainer service and creates the visual displayed by its component
 */
export interface VisualizationModelPresenter extends VisualizationPresenter {

}
