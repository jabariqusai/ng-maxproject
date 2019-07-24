import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientAddSub: Subscription;
  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
    ) {
    this.ingredients = this.slService.getIngredients();
   }

  ngOnInit() {
    this.ingredientAddSub = this.slService.ingredientAddEvent.subscribe(ingredients => {
      this.ingredients = ingredients;
    });
    this.loggingService.printLog('Hello from shopping-list.component.ts');
  }

  ngOnDestroy() {
    this.ingredientAddSub.unsubscribe();
  }

  edit(index: number) {
    this.slService.triggerItemEdit(index);
  }
}
