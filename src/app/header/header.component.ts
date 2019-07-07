import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private recipeService: RecipeService,
    private dataService: DataStorageService,
    private authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.dataService.storeRecipes(recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    this.dataService.getRecipes()
      .subscribe((recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
  }

  logout() {
    this.authService.logout();
  }
}
