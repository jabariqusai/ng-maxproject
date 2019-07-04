import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  activeRecipe: Recipe;
  customSuscription: Subscription;
  constructor() {
   }

  ngOnInit() {
    const myObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        if (count > 5) {
          observer.complete();
          observer.error(new Error('Count is greater than 5'));
        }
        observer.next(count++);
      }, 500);
    });

    this.customSuscription = myObservable.pipe(
      filter(data => data % 2 === 0),
      map(data => 'Round ' + (data + 1)))
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('Observable completed.');
      }
    );
  }

  recipeSelected(recipe: Recipe) {
    this.activeRecipe = recipe;
  }

  ngOnDestroy() {
    this.customSuscription.unsubscribe();
  }
}
