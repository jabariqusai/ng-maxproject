import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private route: ActivatedRoute, private slService: ShoppingListService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.recipe = data.recipe;
    });
  }

  addIngredientsToSL(){
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
