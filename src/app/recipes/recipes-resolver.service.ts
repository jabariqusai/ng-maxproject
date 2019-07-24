import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService
    ) { }

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot): Observable<Recipe[]> {
      return this.dataService.getRecipes()
      .pipe(tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes)));
    }
}
