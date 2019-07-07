import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipes: Recipe[];
  api: string;

  constructor(
    private http: HttpClient
    ) {
    this.recipes = [];
    this.api = 'https://ng-recipe-book-bb907.firebaseio.com/';
  }

  storeRecipes(recipes: Recipe[]): Observable<any> {
      return this.http.put(this.api + 'recipes.json', recipes);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.api + 'recipes.json');
  }
}
