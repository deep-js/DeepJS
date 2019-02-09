import { Observable } from 'rxjs';
export interface VisualizationPresenter{
  getData$():Observable<any>;

}
