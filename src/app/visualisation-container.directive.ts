import { Directive } from '@angular/core';

@Directive({
  selector: '[visualisationContainer]'
})
export class VisualisationContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
