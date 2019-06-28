// Structual directive. requires an asterisk
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective{
    @Input('appUnless') set unless(condition){
        if(condition) this.vcRef.clear();
        else this.vcRef.createEmbeddedView(this.templateRef);
    }

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}