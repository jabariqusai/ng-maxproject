import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  name: string;
  amount: number;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd(){
    let item = new Ingredient(this.name, this.amount);
    this.shoppingListService.addIngredient(item);
  }

}
