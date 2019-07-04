import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{
    ingredientAddEvent = new Subject<Ingredient[]>();
    private _ingredients = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 100)
      ]; // A little more tomatoes never hurt anyone

    getIngredients(): Ingredient[]{
        return this._ingredients.slice();
    }

    addIngredient(item: Ingredient){
        this._ingredients.push(item);
        this.ingredientAddEvent.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]){
        this._ingredients.push(...ingredients); // Spread operator ...
        this.ingredientAddEvent.next(this.getIngredients());
    }
}
