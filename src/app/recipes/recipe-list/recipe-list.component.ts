import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnDestroy {

  recipes: Recipe[];
  recipesUpdateSub: Subscription;
  constructor(private recipeService: RecipeService) {
    this.recipes = this.recipeService.getRecipes();
    this.recipesUpdateSub = this.recipeService.recipesUpdatedEvent.subscribe( recipes => {
      this.recipes = recipes;
    });
   }

  ngOnDestroy() {
    this.recipesUpdateSub.unsubscribe();
  }
}
