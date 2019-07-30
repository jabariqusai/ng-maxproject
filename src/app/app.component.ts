import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-max-project';

  constructor(
    private store: Store<AppState>,
    private loggingService: LoggingService
    ) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from app.component.ts');
  }
}
