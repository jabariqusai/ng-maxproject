import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{
    ingredientAddEvent = new EventEmitter<Ingredient[]>();
    private _ingredients = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 100)
      ]; // A little more tomatoes never hurt anyone
    
    getIngredients(): Ingredient[]{
        return this._ingredients.slice();
    }

    addIngredient(item: Ingredient){
        this._ingredients.push(item);
        this.ingredientAddEvent.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]){
        this._ingredients.push(...ingredients); // Spread operator ...
        this.ingredientAddEvent.emit(this.getIngredients());
    }
}