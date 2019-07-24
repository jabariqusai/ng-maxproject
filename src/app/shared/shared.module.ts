import { NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    HighlightDirective,
    UnlessDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    UnlessDirective,
    LoadingSpinnerComponent,
    CommonModule
  ],
  providers: [LoggingService]
})
export class SharedModule { }
