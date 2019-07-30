import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
    ) { }

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot): Observable<Recipe[]> {
      this.store.dispatch(new RecipeActions.FetchRecipes());
      return this.actions$.pipe(
        ofType(RecipeActions.SET_RECIPES),
        take(1)
      );
    }
}
