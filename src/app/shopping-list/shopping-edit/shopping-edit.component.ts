import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SLActions from '../store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingForm', {static: false}) shoppingForm: NgForm;
  editMode: boolean;
  editIndex: number;
  storeSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.editMode = false;
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('shoppingList').subscribe(stateData =>  {
      if (stateData.ingredientInEdit) {
        this.shoppingForm.setValue({
          name: stateData.ingredientInEdit.name,
          amount: stateData.ingredientInEdit.amount
        });
        this.editIndex = stateData.ingredientInEditIndex;
        this.editMode = true;
      }
    });
  }

  formSubmit(form: NgForm) {
    // Form is garanteed valid
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(new SLActions.UpdateIngredient({newIngredient: ingredient}));
    } else {
      this.store.dispatch(new SLActions.AddIngredient(ingredient));
    }
    this.resetForm(form);
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  resetForm(form: NgForm) {
    this.store.dispatch(new SLActions.StopEdit());
    this.editMode = false;
    form.reset();
  }


  deleteItem(form: NgForm) {
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.resetForm(form);
  }

}
