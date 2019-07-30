import { Ingredient } from '../../shared/ingredient.model';
import * as actions from './shopping-list.actions';
import { appendToIngredients } from './reducer-helper-functions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  ingredientInEdit: Ingredient;
  ingredientInEditIndex: number;
}

const initState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 100)
  ],
  ingredientInEdit: null,
  ingredientInEditIndex: -1
};

export function shoppingListReducer(state = initState, action: actions.ShoppingListActions): ShoppingListState {
  let newState: ShoppingListState;

  switch (action.type) {
    // -------------------------------------------------------------------------------------
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    // -------------------------------------------------------------------------------------
    case actions.ADD_INGREDIENTS:
      const updatedIngredientsArray = appendToIngredients(state.ingredients, action.payload);
      return {
        ...state,
        ingredients: updatedIngredientsArray
      };
    // -------------------------------------------------------------------------------------
    case actions.UPDATE_INGREDIENT:
      newState = Object.assign({}, state);
      newState.ingredients[state.ingredientInEditIndex] = action.payload.newIngredient;
      return newState;
    // -------------------------------------------------------------------------------------
    case actions.DELETE_INGREDIENT:
      newState = Object.assign({}, state);
      newState.ingredients.splice(state.ingredientInEditIndex, 1);
      return newState;
    // -------------------------------------------------------------------------------------
    case actions.START_EDIT:
      return {
        ...state,
        ingredientInEdit: { ...state.ingredients[action.payload] },
        ingredientInEditIndex: action.payload
      };
    // -------------------------------------------------------------------------------------
    case actions.STOP_EDIT:
      return {
        ...state,
        ingredientInEdit: null,
        ingredientInEditIndex: -1
      };
    // -------------------------------------------------------------------------------------
    default:
      return state;
  }
}
