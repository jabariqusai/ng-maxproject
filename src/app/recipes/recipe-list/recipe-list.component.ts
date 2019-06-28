import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Output('itemSelected') recipeSelected = new EventEmitter<Recipe>();

  constructor() {
   }

  ngOnInit() {
  }

  onItemSelect(item: Recipe){
    this.recipeSelected.emit(item);
  }

}
