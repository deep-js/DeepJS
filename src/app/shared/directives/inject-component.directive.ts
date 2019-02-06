import { Directive, ViewContainerRef } from '@angular/core';
import * as api from '@api/core';

@Directive({
  selector: '[inject-component]'
})
export class InjectComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
