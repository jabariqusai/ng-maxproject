import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

// ACTION IDENTIFIERS
export const SET_RECIPES = '[RECIPE]SET_RECIPES';
export const SET_INDEX = '[RECIPE]SET_INDEX';
export const UPDATE_RECIPE = '[RECIPE]UPDATE_RECIPE';
export const DELETE_RECIPE = '[RECIPE]DELETE_RECIPE';
export const CREATE_RECIPE = '[RECIPE]CREATE_RECIPE';
export const FETCH_RECIPES = '[RECIPE]FETCH_RECIPES';
export const STORE_RECIPES = '[RECIPE]STORE_RECIPES';

export type RecipeActions =
  | SetRecipes
  | SetIndex
  | UpdateRecipe
  | DeleteRecipe
  | CreateRecipe
  | StoreRecipes;

// ACTION CLASSES
// -------------------------------------------------------------------------------------
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}
// -------------------------------------------------------------------------------------
export class SetIndex implements Action {
  readonly type = SET_INDEX;

  constructor(public payload: number) {}
}
// -------------------------------------------------------------------------------------
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: Recipe) {}
}
// -------------------------------------------------------------------------------------
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
}
// -------------------------------------------------------------------------------------
export class CreateRecipe implements Action {
  readonly type = CREATE_RECIPE;

  constructor(public payload: Recipe) {}
}
// -------------------------------------------------------------------------------------
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}
// -------------------------------------------------------------------------------------
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;

  constructor(public payload: Recipe[]) {}
}
