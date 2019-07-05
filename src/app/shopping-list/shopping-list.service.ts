import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    ingredientAddEvent = new Subject<Ingredient[]>();
    ingredientEditEvent = new Subject<number>();
    private _ingredients: Ingredient[];
    constructor() {
      this._ingredients = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 100)
      ]; // A little more tomatoes never hurt anyone
    }

    getIngredients(): Ingredient[] {
      return this._ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
      return Object.assign({}, this._ingredients[index]);
    }

    addIngredient(item: Ingredient) {
      this._addLogic(item);
      this.ingredientAddEvent.next(this.getIngredients());
    }

    private _addLogic(item: Ingredient) {
      const index: number = this._ingredients.findIndex((element: Ingredient) => (element.name.toLowerCase() === item.name.toLowerCase()));
      index === -1 ? this._ingredients.push(item) : (this._ingredients[index].amount += item.amount);
    }

    addIngredients(ingredients: Ingredient[]) {
      ingredients.forEach((ingredient: Ingredient) => this._addLogic(ingredient));
      this.ingredientAddEvent.next(this.getIngredients());
    }

    deleteIngredient(index: number) {
      this._ingredients.splice(index, 1);
      this.ingredientAddEvent.next(this.getIngredients());
    }

    triggerItemEdit(index: number) {
      this.ingredientEditEvent.next(index);
    }

    onEditItem(index: number, newItem: Ingredient) {
      this._ingredients[index] = Object.assign({}, newItem);
      this.ingredientAddEvent.next(this.getIngredients());
    }
}
