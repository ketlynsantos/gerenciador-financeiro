import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFullWidth]'
})
export class FullWidthDirective {
  private readonly elemenRef = inject(ElementRef)
  private readonly renderer2 = inject(Renderer2)

  applyFullWidth = input(true, { transform: booleanAttribute, alias: 'appFullWidth'})

  constructor() {
    effect(() => {
      if (this.applyFullWidth()) {
        this.renderer2.setStyle(this.elemenRef.nativeElement, 'width', '100%')
      }
    })
  }

}
