import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  editIndex: number;
  editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {
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
        const recipe: Recipe = data.recipe.self;
        this.initRecipeForm(recipe);
        this.editIndex = data.recipe.index;
        this.editMode = true;
      } else {
        this.initRecipeForm(null);
      }
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
      this.recipeService.updateRecipe(this.editIndex, recipe);
      this.router.navigate(['../..', this.editIndex], {relativeTo: this.route});
    } else {
      const index = this.recipeService.createRecipe(recipe);
      this.router.navigate(['..', index], {relativeTo: this.route});
    }
  }
}
