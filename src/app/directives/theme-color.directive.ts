import { Directive, ElementRef, Input, Renderer2, OnInit , OnChanges, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appThemeColor], [primarybg], [accentbg]'
})
export class ThemeColorDirective implements OnInit, OnChanges {

  @Input() primarybg: string;
  @Input() accentbg: string;

  constructor(private elem: ElementRef, private renderer: Renderer2) { }


  ngOnInit() {
  
    let primarybgcolor = `${ this.primarybg }`;
    this.renderer.setStyle(this.elem.nativeElement, 'background-color', primarybgcolor);

    let accentbgcolor = `${ this.accentbg }`;
    this.renderer.setStyle(this.elem.nativeElement, 'background-color', accentbgcolor);

  }

  ngOnChanges() {

    let primarybgcolor = `${ this.primarybg }`;
    this.renderer.setStyle(this.elem.nativeElement, 'background-color', primarybgcolor);

    let accentbgcolor = `${ this.accentbg }`;
    this.renderer.setStyle(this.elem.nativeElement, 'background-color', accentbgcolor);
  }


}
