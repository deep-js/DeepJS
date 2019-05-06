import { ElementRef, Input, Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[image-drawable]'
})
export class ImageDrawableDirective {

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  @Input() imageData;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.putImageData(this.imageData, 0, 0);
  }
}

