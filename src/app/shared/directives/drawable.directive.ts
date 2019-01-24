import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[drawable]'
})
export class DrawableDirective implements OnInit {
  pos = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width:number;
  height:number;

  @Output() newImage = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.width = 200;//this.canvas.offsetWidth;
    this.height = 200;//this.canvas.offsetHeight;
    //this.ctx.createImageData(this.width,this.height);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getImgData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, this.width, this.height);
    return this.ctx.getImageData(0, 0, this.width, this.height);
  }

  putImgData(imagedata:ImageData): void {
    this.ctx.putImageData(imagedata, 0, 0);
  }

}
