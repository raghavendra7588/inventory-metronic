import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HighlightCard]'
})
export class HighlightCardDirective {

  @HostBinding('style.border') border: string;
  @HostBinding('style.border-radius') borderRadius: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') mouseEnter() {
    this.border = '2px solid #ff8c00';
  }

  @HostListener('click') mouseClick() {
    this.renderer.setStyle(this.elementRef.nativeElement,
      'border',
      '2px solid #ff8c00'
    );
  }

  @HostListener('mouseleave') mouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement,
      'border',
      'none');
  }

}
