import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  index: number;
  constructor(
    private route: ActivatedRoute,
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.recipe = data.recipe.self;
      this.index = data.recipe.index;
    });
  }

  addIngredientsToSL() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
