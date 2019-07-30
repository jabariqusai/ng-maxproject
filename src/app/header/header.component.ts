import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.userSub =  this.store.select('auth')
    .pipe(
      map(data => data.user)
    )
    .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  storeRecipes() {
    this.store.select('recipes').pipe(
      take(1),
      map(recipeState => recipeState.recipes)
    ).subscribe(recipes => this.store.dispatch(new RecipeActions.StoreRecipes(recipes)));
  }

  fetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
