import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe>{

  constructor(private recipeService: RecipeService) { }

  resolve(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): Recipe {
    const recipe = this.recipeService.getRecipe(+currentRoute.params.id);
    return recipe;
  }
}
