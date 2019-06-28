import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private recipeService: RecipeService, private slService: ShoppingListService) { }

  ngOnInit() {
    this.recipeService.recipeSelectedEvent.subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  addIngredientsToSL(){
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
