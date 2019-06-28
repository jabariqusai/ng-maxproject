import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  constructor() {
    this.ingredients = [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 100)]; // A little more tomatoes never hurt anyone
   }

  ngOnInit() {
  }

  addIngredient(item: Ingredient){
    this.ingredients.push(item);
  }

}
