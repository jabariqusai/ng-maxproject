import { Directive, ElementRef, HostListener, Renderer2, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective{
    @Input('appHighlight') color = 'yellow';
    constructor(private element: ElementRef, private renderer: Renderer2){
    }
    @HostBinding('style.backgroundColor') background = null;
    @HostListener('mouseenter') onMouseEnter(){
        this.highlight(this.color);
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.highlight(null);
    }

    private highlight(color: string){
        //this.element.nativeElement.style.backgroundColor = color; // Method 1, Directly access the DOM via element reference
        //this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', color); // Method 2, Use the renderer (best practice)
        this.background = color// Methods 3, Use host binding to continuously bind a DOM property
    }
}