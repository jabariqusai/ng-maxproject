import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelectedEvent = new EventEmitter<Recipe>();
  recipesUpdatedEvent = new EventEmitter<Recipe[]>();
  // tslint:disable-next-line: variable-name
  private _recipes = [
      new Recipe(
          1,
          'Beef Steak',
          'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons',
          'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg',
          [
              new Ingredient('Beef', 1),
              new Ingredient('Lettuce', 1),
              new Ingredient('Potato', 1)
          ]
          ),
      new Recipe(
          2,
          'Cheese Burger',
          'Who doesn\'t like a cheese burger?',
          'https://cdn.pixabay.com/photo/2016/05/25/10/43/hamburger-1414422_1280.jpg',
          [
              new Ingredient('Bun', 2),
              new Ingredient('Beef', 1),
              new Ingredient('Lattuce', 1),
              new Ingredient('Cheese', 1),
              new Ingredient('Fries', 20)
          ]
          ),
      new Recipe(
          3,
          'French Fries',
          'Potato, potato, potato. We all want some.',
          'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg',
          [ new Ingredient('Potato', 1) ]
          ),
      new Recipe(
          4,
          'Cesar Salad',
          'Healthy salad for healthy people. With a little touch of protine',
          'https://cdn.pixabay.com/photo/2017/03/19/14/59/italian-salad-2156723_1280.jpg',
          [
              new Ingredient('Chicken Breast', 1),
              new Ingredient('Lattuce', 1),
              new Ingredient('Cherry Tomato', 10),
              new Ingredient('Cesar Dressing', 1),
              new Ingredient('Mushroom', 3),
              new Ingredient('Mayo', 1),
          ]
          )
    ];

  getRecipes(): Recipe[] {
      // slice function generates a copy of the _recipes array, that way we pass a reference to the new array
      return this._recipes.slice();
  }

  getRecipe(id: number): Recipe {
    const recipe = this._recipes.find(item => item.id === id);
    return Object.assign({}, recipe);
  }

  updateRecipe(newRecipe: Recipe) {
    const index = this._recipes.findIndex(item => item.id === newRecipe.id);
    if (index) {
      this._recipes[index] = Object.assign({}, newRecipe);
      this.recipesUpdatedEvent.emit(this.getRecipes());
    }
  }

  recipeSelected(recipe: Recipe) {
      this.recipeSelectedEvent.emit(recipe);
  }
}
