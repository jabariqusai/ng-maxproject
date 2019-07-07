import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
    constructor(
      private recipeService: RecipeService,
      private dataService: DataStorageService
      ) { }

      storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.dataService.storeRecipes(recipes)
          .subscribe(response => console.log(response));
      }

      fetchRecipes() {
        this.dataService.getRecipes()
          .subscribe((recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
      }
}
