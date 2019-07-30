import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, withLatestFrom, switchMap, map } from 'rxjs/operators';
import * as RecipeActions from './recipes.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeEffects {
  private api: string;

  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private http: HttpClient
    ) {
      this.api = 'https://ng-recipe-book-bb907.firebaseio.com/';
    }

  @Effect({ dispatch: false })
  recipeUpdate = this.actions$
    .pipe(
      ofType(RecipeActions.UPDATE_RECIPE),
      withLatestFrom(this.store),
      tap(([action, storeState]) => {
        this.router.navigate(['/recipes', storeState.recipes.activeIndex]);
      })
    );

  @Effect({ dispatch: false })
  recipeDelete = this.actions$
    .pipe(
      ofType(RecipeActions.DELETE_RECIPE),
      tap(() => this.router.navigate(['..'], {relativeTo: this.route}))
    );

  @Effect({ dispatch: false })
  recipeCreate = this.actions$
    .pipe(
      ofType(RecipeActions.CREATE_RECIPE),
      withLatestFrom(this.store),
      tap(([action, storeState]) => this.router.navigate(['/recipes', storeState.recipes.activeIndex]))
    );

  @Effect({ dispatch: false })
  storeRecipe = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES),
      switchMap((action: RecipeActions.StoreRecipes) => {
        return this.http.put(this.api + 'recipes.json', action.payload);
      }),
      tap(res => console.log(res))
    );

  @Effect()
  fetchRecipes = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.api + 'recipes.json');
      }),
      map(recipes => new RecipeActions.SetRecipes(recipes))
    );
}
