import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<{self: Recipe, index: number}> {

  constructor(private recipeService: RecipeService) { }

  resolve(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): {self: Recipe, index: number} {
    const index = +currentRoute.params.index;
    const recipe = this.recipeService.getRecipe(index);
    return {
      self: recipe,
      index
    };
  }
}
