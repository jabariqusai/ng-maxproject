import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as SLActions from './store/shopping-list.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from shopping-list.component.ts');
  }

  ngOnDestroy() {
  }

  edit(index: number) {
    // this.slService.triggerItemEdit(index);
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
