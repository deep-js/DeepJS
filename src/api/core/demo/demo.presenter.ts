import { Observable } from "rxjs";

/** Presenter for the DemoComponent
 *  Responsible for importing and exporting a demo
 */
export interface DemoPresenter {
    getError$():Observable<String>
}

