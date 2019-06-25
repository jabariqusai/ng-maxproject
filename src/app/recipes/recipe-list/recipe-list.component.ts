import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor() {
    this.recipes.push(new Recipe('Beef Steak', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'));
    this.recipes.push(new Recipe('Beef Steak', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'));
    this.recipes.push(new Recipe('Beef Steak', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'));
    this.recipes.push(new Recipe('Beef Steak', 'This simple, yet extermely delicious recipe is easy to cook and enough for 2 persons', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'));
   }

  ngOnInit() {
  }

}
