import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.recipe = data.recipe;
    });

    this.route.params.subscribe(data => {
      this.store.dispatch(new RecipeActions.SetIndex(+data.index));
    });
  }

  addIngredientsToSL() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe());
  }
}
