import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) {
      this.recipeForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        imgPath: new FormControl(null, [Validators.required]),
        desc: new FormControl(null, [Validators.required]),
        ingredients: new FormArray([])
      });
      this.editMode = false;
    }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data.recipe) {
        const recipe: Recipe = data.recipe;
        this.initRecipeForm(recipe);
        this.editMode = true;
      } else {
        this.initRecipeForm(null);
      }
    });

    this.route.params.subscribe(data => {
      this.store.dispatch(new RecipeActions.SetIndex(+data.index));
    });
  }

  initRecipeForm(recipe: Recipe) {
    if (recipe) {
      this.createIngredientControls(recipe.ingredients);

      this.recipeForm.setValue({
        name: recipe.name,
        imgPath: recipe.imgPath,
        desc: recipe.description,
        ingredients: recipe.ingredients
      });
    } else {
      this.addIngredientRow();
    }
  }

  createIngredientControls(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient: Ingredient) => {
      this.ingredientsFormArray.push(this.buildIngredientFormGroup(ingredient.name, ingredient.amount));
    });
  }

  buildIngredientFormGroup(name: string, amount: number) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.min(1)])
    });
  }

  addIngredientRow() {
    this.ingredientsFormArray.push(this.buildIngredientFormGroup(null, null));
  }

  removeIngredientRow(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }

  get ingredientsFormArray(): FormArray {
    return (this.recipeForm.get('ingredients') as FormArray);
  }

  formSubmit() {
    const values = this.recipeForm.value;
    const recipe = new Recipe(
      values.name,
      values.desc,
      values.imgPath,
      values.ingredients
      );
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe(recipe));
    } else {
      this.store.dispatch(new RecipeActions.CreateRecipe(recipe));
    }
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
