import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';

export interface RecipeState {
  recipes: Recipe[];
  activeIndex: number;
}

const initState: RecipeState = {
  recipes: [],
  activeIndex: -1
};

export function recipeReducer(state = initState, action: RecipeActions.RecipeActions): RecipeState {
  switch (action.type) {
    // -------------------------------------------------------------------------------------
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    // -------------------------------------------------------------------------------------
    case RecipeActions.SET_INDEX:
      return {
        ...state,
        activeIndex: action.payload
      };
    // -------------------------------------------------------------------------------------
    case RecipeActions.UPDATE_RECIPE:
      const updateRecipes: Recipe[] = state.recipes.slice();
      updateRecipes[state.activeIndex] = action.payload;
      return {
        ...state,
        recipes: updateRecipes
      };
    // -------------------------------------------------------------------------------------
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== state.activeIndex),
        activeIndex: -1
      };
    // -------------------------------------------------------------------------------------
    case RecipeActions.CREATE_RECIPE:
      const recipesAfterAddition = state.recipes.slice();
      recipesAfterAddition.push(action.payload);
      const newIndex = recipesAfterAddition.length - 1;
      return {
        ...state,
        recipes: recipesAfterAddition,
        activeIndex: newIndex
      };
    // -------------------------------------------------------------------------------------
    default:
      return state;
  }
}

