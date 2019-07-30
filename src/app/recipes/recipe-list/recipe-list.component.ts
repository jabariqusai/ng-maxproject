import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnDestroy {

  recipes: Recipe[];
  recipesSub: Subscription;
  constructor(private store: Store<AppState>) {
    this.recipesSub =
      this.store.select('recipes')
        .pipe(
          map(data => data.recipes)
        )
        .subscribe(recipes => this.recipes = recipes);
   }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }
}
