import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('shoppingForm', {static: false}) shoppingForm: NgForm;
  editMode: boolean;
  editIndex: number;
  ingredientEditSub: Subscription;

  constructor(private slService: ShoppingListService) {
    this.editMode = false;
  }

  ngOnInit() {
    this.ingredientEditSub = this.slService.ingredientEditEvent.subscribe((index: number) => {
      const ingredient = this.slService.getIngredient(index);
      this.shoppingForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
      this.editIndex = index;
      this.editMode = true;
    });
  }

  formSubmit(form: NgForm) {
    // Form is garanteed valid
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.slService.onEditItem(this.editIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.resetForm(form);
  }

  ngOnDestroy() {
    this.ingredientEditSub.unsubscribe();
  }

  resetForm(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  deleteItem(form: NgForm) {
    this.slService.deleteIngredient(this.editIndex);
    this.resetForm(form);
  }

}
