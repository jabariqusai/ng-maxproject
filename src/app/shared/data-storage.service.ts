import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipes: Recipe[];
  api: string;

  constructor(
    private http: HttpClient,
    // private authService: AuthService
    ) {
    this.recipes = [];
    this.api = 'https://ng-recipe-book-bb907.firebaseio.com/';
  }

  storeRecipes(recipes: Recipe[]): Observable<any> {
      return this.http.put(this.api + 'recipes.json', recipes);
  }

  getRecipes(): Observable<Recipe[]> {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>(this.api + 'recipes.json', {
    //       params: new HttpParams().set('auth', user.token)
    //     });
    //   })
    //   // operators added after the exhuast map operator will be piped
    //   // on the inner observable inserted by the last exhuast map
    //   );
    return this.http.get<Recipe[]>(this.api + 'recipes.json');
  }
}
