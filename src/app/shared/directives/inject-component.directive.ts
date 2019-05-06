import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[inject-component]'
})
export class InjectComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
