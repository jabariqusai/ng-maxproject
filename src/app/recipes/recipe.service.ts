import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SLActions from '../shopping-list/store/shopping-list.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelectedEvent = new Subject<Recipe>();
  recipesUpdatedEvent = new Subject<Recipe[]>();
  // tslint:disable-next-line: variable-name
  private _recipes: Recipe[] = [];

  constructor(
    private store: Store<AppState>
    ) {}

  getRecipes(): Recipe[] {
    // slice function generates a copy of the _recipes array, that way we pass a reference to the new array
    return this._recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return Object.assign({}, this._recipes[index]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = Object.assign({}, newRecipe);
    this.recipesUpdatedEvent.next(this.getRecipes());
  }

  createRecipe(newRecipe: Recipe): number {
    const index = this._recipes.push(newRecipe);
    this.recipesUpdatedEvent.next(this.getRecipes());
    return index - 1;
  }

  recipeSelected(recipe: Recipe) {
    this.recipeSelectedEvent.next(recipe);
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesUpdatedEvent.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes.slice();
    this.recipesUpdatedEvent.next(this.getRecipes());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new SLActions.AddIngredients(ingredients));
  }
}
