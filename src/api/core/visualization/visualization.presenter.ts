import { Observable } from 'rxjs';

/**
 * Parent type for all visualization presenters
 * Retrieves data to be visualized and makes it available
 */
export interface VisualizationPresenter{

  /**
   * Get the data to be visualized
   */
  getData$():Observable<any>;

}
