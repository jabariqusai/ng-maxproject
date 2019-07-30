import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Observable<Recipe>> {

  constructor(private store: Store<AppState>) { }

  resolve(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): Observable<Recipe> {
    const index = +currentRoute.params.index;
    return this.store.select('recipes')
      .pipe(
        take(1),
        map(data => data.recipes[index])
      );
  }
}
