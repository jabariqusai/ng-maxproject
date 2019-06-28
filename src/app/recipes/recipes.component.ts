import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  activeRecipe: Recipe;
  recipes: Recipe[];
  constructor() {
    this.recipes =[
      new Recipe('Beef Steak 1', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
      new Recipe('Beef Steak 2', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
      new Recipe('Beef Steak 3', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
      new Recipe('Beef Steak 4', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg')
    ];
   }

  ngOnInit() {
  }

  recipeSelected(recipe: Recipe){
    this.activeRecipe = recipe;
  }

}
