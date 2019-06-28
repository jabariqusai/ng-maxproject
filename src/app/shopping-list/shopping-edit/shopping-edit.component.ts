import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @Output() itemCreated = new EventEmitter<Ingredient>();
  name: string;
  amount: number;
  constructor() { }

  ngOnInit() {
  }

  onAdd(){
    let item = new Ingredient(this.name, this.amount);
    this.itemCreated.emit(item);
  }
}
