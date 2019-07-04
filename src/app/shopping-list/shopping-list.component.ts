import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientAddSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = this.shoppingListService.getIngredients();
   }

  ngOnInit() {
    this.ingredientAddSub = this.shoppingListService.ingredientAddEvent.subscribe(ingredients =>{
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy() {
    this.ingredientAddSub.unsubscribe();
  }
}
